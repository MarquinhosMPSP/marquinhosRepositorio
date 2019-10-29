const moment = require("moment");
const pdf2img = require("pdf2img");

const infocrim = async (browser, nome) => {
  console.log("entrou infocrim");

  let url =
    "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/infocrim/login.html";
  let sysdateFormat = moment().format("DD-MM-YYYY_HH-mm-ss");

  let page = await browser.newPage();

  try {
    await page.goto(url);

    await Promise.all([
      page.waitForNavigation(),
      page.click(
        "#wrapper > tbody > tr:nth-child(4) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(4) > a"
      )
    ]);

    await Promise.all([page.waitForNavigation(), page.click("#submit")]);

    await Promise.all([
      page.waitForNavigation(),
      page.click(
        "body > table > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(2) > a"
      )
    ]);

    await Promise.all([page.click("#cabec > td > a:nth-child(2)")]);

    let pathPdf = __filesPath + "/PDFs/";
    let pathImg = __filesPath + "/Images/";
    let file = `46618865859_${moment().format("DD-MM-YYYY_HH-mm-ss")}_infocrim`;
    await page.emulateMedia("print");
    await page.pdf({ path: `${pathPdf}${file}.pdf`, format: "A4" });
    await page.screenshot({ path: `${pathImg}${file}.png`, fullPage: true });

    await page.close();

    return {
      infocrimPathPdf: `/static/PDFs/${file}.pdf`,
      infocrimPathImg: `/static/Images/${file}.png`,
      successInfocrim: true
    };
  } catch (error) {
    console.log(error);

    await page.close();
    return { errorInfocrim: true };
  }
};

module.exports = infocrim;
