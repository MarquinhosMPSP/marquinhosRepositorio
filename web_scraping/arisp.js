const arisp = async (browser, cpf, cnpj) => {
  const download = require("download-pdf");
  const moment = require("moment");
  const PDF2Pic = require("pdf2pic");

  let sysdateFormat = moment().format("DD-MM-YYYY_HH-mm-ss");

  console.log("entrou arisp");

  let url =
    "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/arisp/login.html";
  let urlBase =
    "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/arisp/";

  let newPage1 = null;

  let page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    await Promise.all([page.click("#btnCallLogin")]);

    await Promise.all([page.click("#btnAutenticar"), page.waitForNavigation()]);

    await Promise.all([
      await page.waitForSelector("#liInstituicoes > a"),
      page.hover("#liInstituicoes > a")
    ]);

    await Promise.all([
      await page.waitForSelector(
        "#liInstituicoes > div > ul > li:nth-child(3) > a"
      ),
      page.click("#liInstituicoes > div > ul > li:nth-child(3) > a"),
      page.waitForNavigation()
    ]);

    await Promise.all([page.click("#Prosseguir"), page.waitForNavigation()]);

    await Promise.all([
      page.click(
        "#main > div.form-default > div.contentEditor.consulta-bdlight-holder.grid-12 > div.list-wrap > div > div.selectorAll > div > input[type=checkbox]"
      ),
      page.click("#chkHabilitar")
    ]);

    const href2 = await page.evaluate(() => {
      let href = document
        .querySelector("#Prosseguir")
        .getAttribute("onclick")
        .split("'")[1];
      return href;
    });

    await page.goto(urlBase + href2);

    await Promise.all([
      page.waitForSelector("#filterDocumento"),
      page.focus("#filterDocumento"),
      page.keyboard.type(String(cpf || cnpj)),
      page.waitForSelector("#btnPesquisar"),
      page.click("#btnPesquisar"),
      page.waitForNavigation()
    ]);

    Promise.all([
      await page.waitForSelector("#chk339"),
      await page.click("#chk339"),
      await page.click("#chk7"),
      await page.click("#chk10"),
      await page.click("#btnProsseguir")
    ]);

    const newPagePromise1 = new Promise(x =>
      browser.once("targetcreated", target => {
        console.log("criou pagina");
        x(target.page());
      })
    );
    await page.waitForSelector(
      "#panelMatriculas > tr:nth-child(2) > td:nth-child(4) > a"
    );
    await page.click(
      "#panelMatriculas > tr:nth-child(2) > td:nth-child(4) > a"
    );
    newPage1 = await newPagePromise1;

    console.log("nova pagina");

    await newPage1.waitForSelector("body > a");

    console.log("esperou o body > a");

    const Hreffinal = await newPage1.evaluate(() => {
      let href = document.querySelector("body > a").getAttribute("href");
      return href;
    });
    var pdf1 = urlBase + encodeURIComponent(Hreffinal);
    let pathPDF = __filesPath + "/PDFs/";
    let CPFformat = "1234566";
    let relatorioLinhaDeVIdaNome =
      CPFformat + "_" + sysdateFormat + "_" + "arisp";
    var options = {
      directory: pathPDF,
      filename: `${relatorioLinhaDeVIdaNome}.pdf`
    };

    let arispPathImg = [];

    const pdf2pic = new PDF2Pic({
      density: 100,
      savename: relatorioLinhaDeVIdaNome,
      savedir: __filesPath + "/Images/",
      format: "png",
      size: "595x842"
    });

    let download1 = new Promise((resolve, reject) => {
      download(pdf1, options, err => {
        if (err) reject(err);
        pdf2pic
          .convertBulk(options.directory + options.filename, -1)
          .then(result => {
            result.map(img => arispPathImg.push(`/static/Images/${img.name}`));
            resolve(result);
          });
      });
    });
    await download1;

    await page.close();
    await newPage1.close();

    return {
      arispPathPdf: `/static/PDFs/${relatorioLinhaDeVIdaNome}.pdf`,
      arispPathImg,
      successArisp: true
    };
  } catch (error) {
    console.log(error);

    await page.close();
    if (newPage1) {
      await newPage1.close();
    }
    return { errorArisp: true };
  }
};

module.exports = arisp;
