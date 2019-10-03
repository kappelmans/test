const {By, Key} = require('selenium-webdriver');

async function createLegalEntity(driver, baseUrl, uuid, waitPeriod = 500 ){
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
    await driver.sleep(waitPeriod);

    var option = await blok.findElement(By.xpath("//*[text()='Published']"))
    await option.click();


    await driver.findElement(By.xpath("//input[@type='text' and @name='referentialData.leiCode' ]")).sendKeys('44444444444444444444');
    
    await driver.executeScript("window.scrollBy(0,-200)");
    await driver.sleep(waitPeriod);
    
    blok = await driver.findElement(By.xpath("//div[div[@name='referentialData.language']]"));
    blok.getId().then(function (cont){console.log('language id '+cont)})
    await blok.findElement(By.className("Select-arrow-zone")).click();
    await driver.sleep(waitPeriod);
    option = await blok.findElement(By.xpath("//*[text()='Nederlands']"))
    await option.click();

    blok = await driver.findElement(By.xpath("//div[div[@name='referentialData.segmentation']]"));
    blok.getId().then(function (cont){console.log('language id '+cont)})
    await blok.findElement(By.className("Select-arrow-zone")).click();
    await driver.sleep(waitPeriod);
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
    await driver.sleep(waitPeriod);
    option = await blok.findElement(By.xpath("//*[text()='Professional']"))
    option.click();

    await driver.sleep(waitPeriod);

    await driver.findElement(By.xpath("//a[@href='#/manage/moralcustomers/commercialData']")).click();
    await driver.sleep(waitPeriod);
    blok = await driver.findElement(By.xpath("//div[div[@name='commercialData.sectorList']]"));
    blok.click();

    await driver.sleep(waitPeriod);

    await blok.findElement(By.xpath("//div[text()='Industrials']")).click();
    await driver.sleep(waitPeriod);

    await driver.findElement(By.xpath("//input[@placeholder='Select countries']")).sendKeys('Belgium',Key.ENTER);

    await driver.findElement(By.id("commercialData.regionList_EUROPE")).click();
    await driver.sleep(waitPeriod);

    await driver.findElement(By.xpath("//button[div[text()='Save']]")).click();

    await driver.sleep(waitPeriod);

    nextButton = await driver.findElement(By.xpath("//div[i[contains(@class, 'icon-ico_Cross_24')]]"));
    await nextButton.click()

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


module.exports = {createLegalEntity};