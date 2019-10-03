// Import requirement packages

//require('chromedriver');

const uuidv1 = require('uuid/v1');
var waitPeriod = 1000;

const should = require('should');
//var baseUrl = "https://dot-capital-dev-ui.theglue.com/edcm/index.html#"; //Huidige dev omgeving 1.5 Azure
var baseUrl = "https://edcm-dev-ui.theglue.com/edcm/index.html#";  //??? AWS
////var baseUrl = "https://edcm-migrate-ui.theglue.com/edcm/index.html#"; //To test from prior prod version to new prod version AWS


var assert = require('assert');

const {Builder, Key, By} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const safari = require('selenium-webdriver/safari');

const {login} = require('./test_modules/login')
const {createUser} = require('./test_modules/user')
const {createOffer} = require('./test_modules/offer')
const {createLegalEntity} = require('./test_modules/moralcustomer')

async function openManageLegalEntities(driver){
    var test = await driver.findElement(By.xpath("//a/span[text()='Legal entities']"));
    await driver.get( baseUrl + "manage/moralcustomers")

    driver.sleep(waitPeriod);

    await driver.get( baseUrl + "manage/moralcustomers")
    driver.sleep(waitPeriod);

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('EDCM', function () {
    let driver;
    before(async function() {


        var screen = {
            width: 1240,
            height: 1000
          }

        console.log("Logging before done..." + process.env.SELENIUM_REMOTE_URL)

        if(process.env.TEST_WAIT_PERIOD){
            console.log("TEST_WAIT_PERIOD" + process.env.TEST_WAIT_PERIOD);
            waitPeriod = process.env.TEST_WAIT_PERIOD;
        }
        if(process.env.TEST_BASE_URL){
            console.log("TEST_BASE_URL" + process.env.TEST_BASE_URL);
            baseUrl = process.env.TEST_BASE_URL;
        }

        let headless = process.env.TEST_HEADLESS == 'true';
        console.log("TEST_HEADLESS:" + process.env.TEST_HEADLESS);
        console.log("TEST_HEADLESS " + headless);

        await sleep(process.env.TEST_WAIT_START_TIME);
        console.log("Sleep done...")


//        driver = await new Builder().forBrowser('safari').build();

/*        driver = await new Builder().forBrowser('chrome').build();
        driver.manage().window().setRect(screen);
*/

        //await new Builder().forBrowser('safari').build().then(drv => driver = drv);
        

//        driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().windowSize(screen)).build();
//        driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()/*.headless()*/.windowSize(screen)).build();

//        driver = await new Builder().forBrowser('chrome').build();    
//        driver = await new Builder().usingServer('http://localhost:4444/wd/hub').forBrowser('chrome').setChromeOptions(new chrome.Options()/*.headless()*/.windowSize(screen)).build();    

        

        if(headless){
            driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().windowSize(screen)).build();    
        }
        else{
            screen = {
                width: 1240,
                height: 1000
              }

            driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().windowSize(screen)).build();    
        }

        await driver.get(baseUrl);
        driver.manage().setTimeouts({implicit:5000});
        console.log("Logging after done...")
    });

    after(async function() {
        console.log("Logging after ALL")
        driver.sleep(1000).then(()=>driver && driver.close());
    });
/*
    describe('Log In(1) ',function(){
        before(async function(){           
            await login(driver, 'bank-dealer2@theglue.com',true);
            await driver.sleep(waitPeriod*4);
        })

        it('Log In(1)', function(done) {
            driver.sleep(waitPeriod*4).then(()=>done());
        });

        after(async function(){
            await driver.get( baseUrl + "logout")
            await driver.sleep(waitPeriod);
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
/*
    describe('Create moral customer',function(){
        before(async function(){await login(driver, 'platform-admin2@theglue.com')})
        it('Creating moral customer(1)', function(done) {
            let uuid = uuidv1();
            openManageLegalEntities(driver);
            createLegalEntity(driver, baseUrl, uuid)
                .then(function(entityCreated) { 
                    entityCreated.should.have.lengthOf(1);
                    done(); 
                } );

        });
        it('Creating moral customer(2)', function(done) {
            let uuid = uuidv1();
            openManageLegalEntities(driver);
            createLegalEntity(driver, baseUrl, uuid, waitPeriod)
                .then(function(entityCreated) { 
                    entityCreated.should.have.lengthOf(1);
                    done(); 
                } );

        });        after(async function(){
            await driver.get( baseUrl + "logout");
            await driver.sleep(waitPeriod);
        })
    });
*/

    describe('Render views',function(){
        before(async function(){await login(driver, 'bank-dealer2@theglue.com', true);await driver.sleep(waitPeriod*4);})

        for (let i = 1; i <= 1; i++ ){
            it('View ('+ i + ')', function(done) {
                myFunction = async () => {
                    await driver.sleep(waitPeriod);
                    await driver.get( baseUrl + "manage/moralcustomers");           
                    await driver.sleep(waitPeriod);
                    await driver.get( baseUrl + "manage/issueprograms");           
                    await driver.sleep(waitPeriod);
                    await driver.get( baseUrl + "manage/offers");           
                    await driver.sleep(waitPeriod);
                };
                myFunction().then(()=>done());

            });    
        }

        after(async function(){
            await driver.get( baseUrl + "logout")
            await driver.sleep(waitPeriod);
        })
    });


    describe('Create offer',function(){
        before(async function(){await login(driver, 'bank-dealer2@theglue.com');await driver.sleep(waitPeriod*4);})

        for (let i = 1; i <= 200; i++ ){
            it('Create automated offer ('+ i + ')', function(done) {
                let uuid = uuidv1();
                createOffer(driver, baseUrl, uuid, waitPeriod/2)
                    .then(function(offerCreated) { 
                        driver.sleep(waitPeriod).then(()=>done());
                    } );
            });    
        }

        after(async function(){
            await driver.get( baseUrl + "logout")
            await driver.sleep(waitPeriod);
        })
    });
   /*
    describe('Log In(2) ',function(){
        before(async function(){           
            await login(driver, 'bank-dealer2@theglue.com');
        })

        it('Log In(2)', function(done) {
            driver.sleep(waitPeriod).then(()=>done());
        });
        after(async function(){
            await driver.get( baseUrl + "logout")
            await driver.sleep(waitPeriod);
        })
    });


*/



})


