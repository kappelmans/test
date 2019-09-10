
const { Key, By} = require('selenium-webdriver');

async function createUser(driver, baseUrl, uuid, waitPeriod = 500 ){
        await driver.sleep(waitPeriod);
        await driver.get( baseUrl + "/manage/usermanagement")
        await driver.sleep(waitPeriod);

        var nextButton = await driver.findElement(By.xpath("//button[div[text()='Create user']]"));
        await nextButton.click()

        await driver.sleep(waitPeriod);


        blok = await driver.findElement(By.xpath("//div[div[div[text()='Select user category']]]"));
        await blok.findElement(By.className("Select-arrow")).click();

        await driver.sleep(50);
        var option = await driver.findElement(By.xpath("//*[text()='Bank user']"))
        await option.click();

        await driver.sleep(50);

        var nextButton = await driver.findElement(By.xpath("//button[div[text()='Next']]"));
        await nextButton.click()

        
        await driver.sleep(waitPeriod*1000);
    
}

module.exports = {createUser};