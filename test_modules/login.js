
const {By} = require('selenium-webdriver');
const waitPeriod = 300;

async function login(driver, login, first){
    await driver.findElement(By.partialLinkText('Log in')).click();
    var logInForm = driver.findElement(By.xpath("//form[@name='loginModal']"));
    await logInForm.findElement(By.xpath("//input[@type='text']")).sendKeys(login);
    await logInForm.findElement(By.xpath("//button[@type='submit']")).click();

    if (first){
        nextButton = await driver.findElement(By.xpath("//button[div[text()='Continue']]"));
        await nextButton.click();
        await driver.sleep(waitPeriod);
    }

}

module.exports = {login};