const moment = require("moment");

const infocrim = async browser => {
  console.log("entrou infocrim");

  let url =
    "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/infocrim/login.html";

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

    let file = `./PDFsAndImages/PDFs/46618865859_${moment().format(
      "DD-MM-YYYY_HH-mm-ss"
    )}_infocrim.pdf`;
    await page.emulateMedia("screen");
    await page.pdf({ path: file, format: "A4", printBackground: true });

    await page.close();

    return { infocrimPathPdf: file };
  } catch (error) {
    console.log(error);

    await page.close();
    return { errorInfocrim: "Ocorreu um erro" };
  }
};

module.exports = infocrim;
