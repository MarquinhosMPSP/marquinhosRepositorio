const infocrim = async (browser) => {
  const fs = require("fs");
  const request = require("request-promise-native");

  console.log('entrou infocrim...');

  let url = 'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/infocrim/login.html'

  let page = await browser.newPage();

  try {
    await page.goto(url)

    await Promise.all([
      page.waitForNavigation(),
      page.click('#wrapper > tbody > tr:nth-child(4) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(4) > a')
    ])

    await Promise.all([
      page.waitForNavigation(),
      page.click('#submit')
    ])

    await Promise.all([
      page.waitForNavigation(),
      page.click('body > table > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(2) > a'),
    ])

    await Promise.all([
      page.click('#cabec > td > a:nth-child(2)')
    ])

    let fileBuffer = await request.get({ uri: page.url(), encoding: null });
    console.log("Salvando o arquivo " + "infocrim.html" + "...");
    fs.writeFileSync("infocrim.html", fileBuffer);

    await page.close();

    return 'Ok'
  } catch (error) {
    await page.close();
    return 'Ocorreu um erro'
  }

}


module.exports = infocrim