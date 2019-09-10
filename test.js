// Import requirement packages

//require('chromedriver');
var should = require('should');

const uuidv1 = require('uuid/v1');
const waitPeriod = 2500;

//const baseUrl = "https://edcm-migrate-ui.theglue.com/edcm/index.html#";
const baseUrl = "https://edcm-dev-ui.theglue.com/edcm/index.html#";
//const baseUrl = "https://dot-capital-dev-ui.theglue.com/edcm/index.html#";

const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');

const webdriver = require('selenium-webdriver');

const {login} = require('./test_modules/login')
const {createUser} = require('./test_modules/user')
const {createOffer} = require('./test_modules/offer')


async function openManageLegalEntities(driver){
    var test = await driver.findElement(By.xpath("//a/span[text()='Legal entities']"));
    await driver.get( baseUrl + "manage/moralcustomers")

    driver.sleep(waitPeriod);

    await driver.get( baseUrl + "manage/moralcustomers")
    driver.sleep(waitPeriod);

}

async function createLegalEntity(driver){
    let uuid = uuidv1();
    await driver.findElement(By.xpath("//a/span[text()='Legal entities']"));
    await driver.get( baseUrl + "manage/moralcustomers/create");

    await driver.sleep(waitPeriod);

    await driver.get( baseUrl + "manage/moralcustomers/create");
    await driver.sleep(waitPeriod);

    await driver.executeScript("document.body.style.zoom='100%'");
    
    await driver.findElement(By.xpath("//input[@type='text' and @name='referentialData.name' ]")).sendKeys('Kris TEST1 N.V.');
    await driver.findElement(By.xpath("//input[@type='text' and @name='referentialData.officialName' ]")).sendKeys('Of Kris N.V.');
    await driver.findElement(By.xpath("//input[@type='text' and @name='referentialData.externalReference' ]")).sendKeys(uuid);
    
    await driver.findElement(By.xpath("//input[@type='checkbox' and @name='referentialData.investor' ]")).sendKeys(Key.SPACE);
    await driver.findElement(By.xpath("//input[@type='checkbox' and @name='referentialData.withholdingTaxSubject' ]")).sendKeys(Key.SPACE);

    await driver.findElement(By.xpath("//input[@type='checkbox' and @name='referentialData.issuer' ]")).sendKeys(Key.SPACE);

    var blok = await driver.findElement(By.xpath("//div[div[@name='referentialData.moralCustomerStatus']]"));
    blok.getId().then(function (cont){console.log('moralCustomerStatus id '+cont)})
    await blok.findElement(By.className("Select-arrow")).click();
    var option = await blok.findElement(By.xpath("//*[text()='Published']"))
    await option.click();


    await driver.findElement(By.xpath("//input[@type='text' and @name='referentialData.leiCode' ]")).sendKeys('44444444444444444444');

    blok = await driver.findElement(By.xpath("//div[div[@name='referentialData.language']]"));
    blok.getId().then(function (cont){console.log('language id '+cont)})
    await blok.findElement(By.className("Select-arrow-zone")).click();
    option = await blok.findElement(By.xpath("//*[text()='Nederlands']"))
    await option.click();

    blok = await driver.findElement(By.xpath("//div[div[@name='referentialData.segmentation']]"));
    blok.getId().then(function (cont){console.log('language id '+cont)})
    await blok.findElement(By.className("Select-arrow-zone")).click();
    option = await blok.findElement(By.xpath("//*[text()='Corporate']"))
    await option.click();

    await driver.findElement(By.xpath("//input[@type='text' and @name='referentialData.naceCode' ]")).sendKeys('123456');
    await driver.findElement(By.xpath("//input[@type='text' and @name='referentialData.vatNumber' ]")).sendKeys('0474123123');
    await driver.findElement(By.xpath("//input[@type='text' and @name='referentialData.officialAddress.addressLine1' ]")).sendKeys('Street');
    await driver.findElement(By.xpath("//input[@type='text' and @name='referentialData.officialAddress.city' ]")).sendKeys('Brussels');
    await driver.findElement(By.xpath("//input[@type='text' and @name='referentialData.officialAddress.postalCode' ]")).sendKeys('1080');

    blok = await driver.findElement(By.xpath("//div[div[div[contains(@class,'referentialData.officialAddress.country')]]]"));
    await blok.findElement(By.css("input")).sendKeys(Key.SPACE);
    option = await blok.findElement(By.xpath("//*[text()='Belgium']"))

    await option.click();


    await driver.executeScript("document.documentElement.scrollTop = 0;")

    await driver.findElement(By.xpath("//a[@href='#/manage/moralcustomers/mifidData']")).click();
    blok = await driver.findElement(By.xpath("//div[div[div[div[text()='Select MiFID classification']]]]"));
    await blok.findElement(By.xpath("//div[text()='Select MiFID classification']")).click();
    option = await blok.findElement(By.xpath("//*[text()='Professional']"))
    option.click();

    

    await driver.findElement(By.xpath("//a[@href='#/manage/moralcustomers/commercialData']")).click();

    blok = await driver.findElement(By.xpath("//div[div[@name='commercialData.sectorList']]"));
    blok.click();
    await blok.findElement(By.xpath("//div[text()='Industrials']")).click();
    

    await driver.findElement(By.xpath("//input[@placeholder='Select countries']")).sendKeys('Belgium',Key.ENTER);

    await driver.findElement(By.id("commercialData.regionList_EUROPE")).click();


    await driver.findElement(By.xpath("//button[div[text()='Save']]")).click();

    await driver.sleep(waitPeriod);

    //await openManageLegalEntities(driver);
 

    //find newly created moral customer
    var searchForm = await driver.findElement(By.xpath("//form[@name='moralCustomerOverviewSearch']"));
    await searchForm.findElement(By.name('name')).sendKeys(uuid);
    //await searchForm.findElement(By.name('name')).submit();
    await searchForm.findElement(By.css("button")).click();

    //find the table
    var table = await driver.findElement(By.css("tbody"));
    var tableLines = await table.findElements(By.css("tr"));

    console.log('tableLines.length: ' + tableLines.length)

    return tableLines    
}

describe('EDCM', function () {
    let driver;
    before(async function() {


        console.log("Logging before done...")
        driver = await new Builder().forBrowser('firefox').build();
        await driver.get(baseUrl);
        driver.manage().setTimeouts({implicit:5000});
        console.log("Logging after done...")


    });

    after(function() {
        console.log("Logging after00...")
        driver.sleep(9000).then(()=>driver && driver.close());
    });
/*
    describe('Log In - Log Out 1 ',function(){
        before(async function(){            console.log("Login1...");
        //await login(driver, 'bank-dealer2@theglue.com');

        await login(driver, 'bank-dealer2@theglue.com',true);

        })

        it('dummy', function(done) {
            driver.sleep(1000).then(()=>done());
        });
        after(async function(){
            console.log("Logout1...");
            await driver.sleep(1000);
            await driver.get( baseUrl + "logout")
        })
    });
*/
/*
    describe('Create user',function(){
        before(async function(){await login(driver, 'platform-admin@theglue.com', true);})
        it('Create user', function(done) {
            let uuid = uuidv1();
            createUser(driver, baseUrl, uuid)
                .then(function(offerCreated) { 
                    //offerCreated.should.have.lengthOf(1);
                    driver.sleep(5000).then(()=>done());
                } );
        });
        after(async function(){
            console.log("Logging out1...");
            await driver.get( baseUrl + "logout")
        })
    });*/

    describe('Create offer',function(){
        before(async function(){await login(driver, 'bank-dealer2@theglue.com', true);})
        it('Create an offer', function(done) {
            let uuid = uuidv1();
            createOffer(driver, baseUrl, uuid)
                .then(function(offerCreated) { 
                    //offerCreated.should.have.lengthOf(1);
                    driver.sleep(5000).then(()=>done());
                } );
        });
        after(async function(){
            console.log("Logging out1...");
            await driver.get( baseUrl + "logout")
        })
    });
   
    describe('Log In - Log Out 2 ',function(){
        before(async function(){            console.log("Login2...");
        await login(driver, 'bank-dealer2@theglue.com');})
        it('dummy', function(done) {
            driver.sleep(1000).then(()=>done());
        });
        after(async function(){
            console.log("Logout2...");
            await driver.sleep(1000);
            await driver.get( baseUrl + "logout")
        })
    });

    describe('Create moral customer',function(){
        before(async function(){await login(driver, 'platform-admin2@theglue.com')})
        it('Login to EDCM', function(done) {
            console.log("Logging test1 start...")

            openManageLegalEntities(driver);
            var entityCreated = createLegalEntity(driver)
                .then(function(entityCreated) { 
                    entityCreated.should.have.lengthOf(1);
                    done(); 
                } );

        });
        after(async function(){
            console.log("Logging out2...");
            //await driver.get( baseUrl + "logout")
        })
    });




})


