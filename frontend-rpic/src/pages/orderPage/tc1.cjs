const { Builder, By, until } = require('selenium-webdriver');

async function testOrderPage() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/order');
    await driver.sleep(2000); // tambahan delay untuk React load

    // Ganti 'durasi' sesuai ID atau selector asli
    await driver.wait(until.elementLocated(By.id('durasi')), 5000);
    await driver.findElement(By.id('durasi')).sendKeys('');

    await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Konfirmasi')]")), 5000);
    await driver.findElement(By.xpath("//button[contains(text(),'Konfirmasi')]")).click();

    const errorEl = await driver.wait(until.elementLocated(By.className('error-msg')), 5000);
    const errorText = await errorEl.getText();

    if (errorText.includes('Durasi tidak boleh kosong')) {
      console.log('✅ Test berhasil: Validasi durasi kosong tampil.');
    } else {
      console.log('❌ Test gagal: Validasi tidak muncul sesuai.');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await driver.quit();
  }
}

testOrderPage();
