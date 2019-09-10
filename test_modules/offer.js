
const { Key, By} = require('selenium-webdriver');

async function addPricingCondition(driver, period, spread, waitPeriod = 300 ){
    await driver.findElement(By.xpath("//button[div[text()='Add pricing condition']]")).click();
    await driver.sleep(waitPeriod*2);
    
    await driver.findElement(By.name("tenorType")).click();
    await driver.sleep(waitPeriod);

    await driver.findElement(By.xpath("//input[@name='tenorValue']")).sendKeys(period);
    await driver.findElement(By.xpath("//input[@name='costsLinkedToService']")).sendKeys(1);
    
    blok = await driver.findElement(By.xpath("//div[div[div[text()='Select tenor unit']]]"));
    await blok.findElement(By.className("Select-arrow")).click();
    var option = await driver.findElement(By.xpath("//*[text()='Month']"))
    await option.click();

    blok = await driver.findElement(By.xpath("//div[div[div[text()='Select yield type']]]"));
    await blok.findElement(By.className("Select-arrow")).click();
    var option = await driver.findElement(By.xpath("//*[text()='Reference']"))
    await option.click();

    await driver.sleep(waitPeriod);
    await driver.findElement(By.xpath("//input[@name='costsLinkedToService']")).sendKeys(1);
    await driver.findElement(By.xpath("//input[@name='spreadValue']")).sendKeys(spread);

    await driver.findElement(By.xpath("//button[div[text()='Add']]")).click();

    await driver.sleep(waitPeriod);

}

async function createOffer(driver, baseUrl, uuid, waitPeriod = 350){
    await driver.sleep(waitPeriod);
    await driver.get( baseUrl + "manage/offers")

    await driver.sleep(waitPeriod);
    await driver.get( baseUrl + "manage/offers")
    await driver.sleep(waitPeriod);

    await driver.findElement(By.xpath("//*[text()='Create offer']")).click();

    var blok = await driver.findElement(By.xpath("//div[div[div[div[text()='Select offer type']]]]"));
    await blok.findElement(By.css('input')).sendKeys('Short term', Key.ENTER);

    await driver.findElement(By.id('executionType.1')).click();

    var nextButton = await driver.findElement(By.xpath("//button[div[text()='Next']]"));
    await nextButton.click()
    await driver.sleep(waitPeriod * 2 );

    var popup = await driver.findElement(By.xpath("//div[div[div[h3[text()='Offer programme']]]]"));
    var table = await popup.findElement(By.css("tbody"));

    var rows = await table.findElements(By.css('tr'));
    console.log('Total rows:' + rows.length);
    rows[1].click();

    var nextButton = await driver.findElement(By.xpath("//button[div[text()='Next']]"));
    await nextButton.click()
    await driver.sleep(waitPeriod);
/*
    var nextButton = await driver.findElement(By.xpath("//button[div[text()='Next']]"));
    await nextButton.click()
    await driver.sleep(waitPeriod * 2);*/

    var nextButton = await driver.findElement(By.xpath("//button[div[text()='Create']]"));
    await nextButton.click()
    await driver.sleep(waitPeriod * 2);

    var amount = await driver.findElement(By.xpath("//input[@name='name']"));
    await amount.click();
    await driver.sleep(waitPeriod);

    await amount.clear();    
    await amount.sendKeys('Test ' + uuid);

    //await driver.findElement(By.css("body")).sendKeys(Key.DOWN);

    await driver.executeScript("window.scrollBy(0,400)");

    //await driver.sleep(waitPeriod);

    var dateBlock = await driver.findElement(By.xpath("//div[div[span[text()='Subscription start date']]]"));
    var dateField = await dateBlock.findElement(By.css('input'));
    dateField.click();
    var dateFields = await dateBlock.findElements(By.css('input'));
    await dateFields[1].sendKeys('14/09/2019');
    await driver.sleep(waitPeriod);

    nextButton = await driver.findElement(By.xpath("//button[div[text()='Next']]"));
    await nextButton.click();
    await driver.sleep(waitPeriod);


    amount = await driver.findElement(By.xpath("//input[@name='totalAmountValue']"));
    await amount.sendKeys('550000000');

    await driver.executeScript("window.scrollBy(0,200)");

    await addPricingCondition(driver, 8,4);
    await addPricingCondition(driver, 6,3);
    await addPricingCondition(driver, 4,2);
    await addPricingCondition(driver, 3,1);
    
    nextButton = await driver.findElement(By.xpath("//button[div[text()='Next']]"));
    await nextButton.click();
    await driver.sleep(waitPeriod);

    await driver.executeScript("window.scrollBy(0,400)");

/* Seems now defaulted in version 1.5(05/09/2019)!
    var blok = await driver.findElement(By.xpath("//div[div[div[text()='Select security type(s)']]]"));
    await blok.findElement(By.className("Select-arrow")).click();
    var option = await driver.findElement(By.xpath("//*[text()='Treasury Notes']"))
    await option.click();*/

    await driver.executeScript("window.scrollBy(0,400)");

    blok = await driver.findElement(By.xpath("//div[div[div[text()='Select product sheet']]]"));
    await blok.findElement(By.className("Select-arrow")).click();
    var option = await driver.findElement(By.xpath("//*[text()='Commercial Paper']"))
    await option.click();

    nextButton = await driver.findElement(By.xpath("//button[div[text()='Next']]"));
    await nextButton.click();
    await driver.sleep(waitPeriod);

    nextButton = await driver.findElement(By.xpath("//button[div[text()='Publish now']]"));
    await nextButton.click()
}


module.exports = {createOffer};