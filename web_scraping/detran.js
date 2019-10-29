const detran = async (browser, cpf, cnpj) => {
  const moment = require("moment");
  let sysdateFormat = moment().format("DD-MM-YYYY_HH-mm-ss");
  let CPFformat = "1234566";
  const download = require("download-file");
  const PDF2Pic = require("pdf2pic");

  console.log("entrou detran");

  let pathPDF = __filesPath + "/PDFs/";
  let pathImages = __filesPath + "/Images/";

  let url =
    "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/detran/login.html";
  let page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.focus(
      'input[class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all campoObrigatorio ui-state-focus"]'
    );
    await page.keyboard.type("nome do usuario");
    await page.focus(
      'input[class="ui-inputfield ui-password ui-widget ui-state-default ui-corner-all campoObrigatorio"]'
    );
    await page.keyboard.type("senha1234");

    await Promise.all([
      page.waitForNavigation(),
      page.click(
        'button[class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only botao"]'
      )
    ]);

    /* ############### SALVANDO PDF 1 ############### **/
    await Promise.all([
      page.waitForNavigation(),
      page.waitForSelector("#navigation_a_M_16"),
      await page.hover("#navigation_a_M_16"),
      page.click("#navigation_a_F_16")
    ]);

    await page.focus(
      'input[class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all"]'
    );
    await page.keyboard.type("registro");

    await page.focus('td[class="coluna4"] > input');
    await page.keyboard.type("PGU");

    await page.focus('td[class="coluna6"] > input');
    await page.keyboard.type(String(cpf));

    await page.focus('tr:nth-child(2)> td[class="coluna2"] > input');
    await page.keyboard.type(String(cnpj));

    const Href = await page.evaluate(() => {
      let href = document
        .querySelector(
          'a[class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only botao"]'
        )
        .getAttribute("href");
      return href;
    });

    let urlBase =
      "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/detran/";
    var pdf1 = urlBase + encodeURIComponent(Href);

    let relatorioLinhaDeVIdaNome =
      CPFformat + "_" + sysdateFormat + "_" + "Detran1";

    var options1 = {
      directory: pathPDF,
      filename: relatorioLinhaDeVIdaNome + ".pdf"
    };

    let detranPathImg = [];

    let pdf2pic = new PDF2Pic({
      density: 100,
      savename: relatorioLinhaDeVIdaNome,
      savedir: __filesPath + "/Images/",
      format: "png",
      size: "595x842"
    });

    let download1 = new Promise((resolve, reject) => {
      download(pdf1, options1, err => {
        if (err) reject(err);
        pdf2pic
          .convertBulk(options1.directory + options1.filename, -1)
          .then(result => {
            result.map(img => detranPathImg.push(`/static/Images/${img.name}`));
            resolve(result);
          });
      });
    });
    await download1;

    /* ######### SALVANDO PDF 2 ############# **/
    await Promise.all([
      page.waitForNavigation(),
      page.waitForSelector("#navigation_a_M_18"),
      await page.hover("#navigation_a_M_18"),
      page.click("#navigation_a_F_18")
    ]);

    await page.focus(
      'input[class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all"]'
    );
    await page.keyboard.type("PLACA");

    await page.focus(
      'input[class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all"]'
    );
    await page.keyboard.type("CPF OU CNPJ");

    const Href2 = await page.evaluate(() => {
      let href = document
        .querySelector(
          'a[class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only botao"]'
        )
        .getAttribute("href");
      return href;
    });

    var pdf2 = urlBase + encodeURIComponent(Href2);

    let relatorioVeiculoNome =
      CPFformat + "_" + sysdateFormat + "_" + "Detran2";

    var options2 = {
      directory: pathPDF,
      filename: relatorioVeiculoNome + ".pdf"
    };

    let pdf2pic2 = new PDF2Pic({
      density: 100,
      savename: relatorioVeiculoNome,
      savedir: __filesPath + "/Images/",
      format: "png",
      size: "595x842"
    });

    let download2 = new Promise((resolve, reject) => {
      download(pdf2, options2, err => {
        if (err) reject(err);
        pdf2pic2
          .convertBulk(options2.directory + options2.filename, -1)
          .then(result => {
            result.map(img => detranPathImg.push(`/static/Images/${img.name}`));
            resolve(result);
          });
      });
    });
    await download2;

    /** ############## salvando imagem ############## */
    await Promise.all([
      page.waitForNavigation(),
      page.waitForSelector("#navigation_a_M_16"),
      await page.hover("#navigation_a_M_16"),
      page.click('a[href="pagina4-pesquisa-imagem-cnh.html"]')
    ]);

    await page.focus(
      'input[class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all"]'
    );
    await page.keyboard.type("registroPGU");

    await page.focus(
      'input[class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all"]'
    );
    await page.keyboard.type("CPF");

    const newPage2Promise = new Promise(x =>
      browser.once("targetcreated", target => x(target.page()))
    );
    await page.click('a > span[class="ui-button-text ui-c"]');
    const newPage2 = await newPage2Promise;

    var data2 = newPage2.url();

    let pageImagem = await browser.newPage();
    pageImagem.setViewport({ width: 1400, height: 1200, deviceScaleFactor: 2 });
    await pageImagem.goto(data2, { waitUntil: "networkidle2" });

    await pageImagem.screenshot({
      path: pathImages + CPFformat + "_" + sysdateFormat + "_" + "detran.png",
      clip: { x: 410, y: 340, width: 767, height: 400 }
    });

    detranPathImg.push(
      "/static/Images/" + CPFformat + "_" + sysdateFormat + "_" + "detran.png"
    );

    pageImagem.close();

    let detranPathPdf = [
      `/static/PDFs/${relatorioLinhaDeVIdaNome}.pdf`,
      `/static/PDFs/${relatorioVeiculoNome}.pdf`
    ];

    await page.close();
    let dataFim = {
      detranPathPdf,
      detranPathImg
    };

    return Object.assign(dataFim, { successDetran: true });
  } catch (error) {
    console.log(error);
    await page.close();
    return { errorDetran: true };
  }
};

module.exports = detran;
