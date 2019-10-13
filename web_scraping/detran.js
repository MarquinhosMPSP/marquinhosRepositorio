const detran = async browser => {
  const moment = require("moment");
  let sysdateFormat = moment().format("DD-MM-YYYY_HH-mm-ss");
  let CPFformat = "1234566";
  const download = require("download-pdf");

  console.log("entrou detran");

  let pathPDF = "PDFsAndImages/PDFs/";
  let pathImages = "PDFsAndImages/Images/";

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

    console.log(1);

    await Promise.all([
      page.waitForNavigation(),
      page.click(
        'button[class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only botao"]'
      )
    ]);
    console.log(2);

    /* ############### SALVANDO PDF 1 ############### **/
    await Promise.all([
      page.waitForNavigation(),
      page.waitForSelector("#navigation_a_M_16"),
      await page.hover("#navigation_a_M_16"),
      page.click("#navigation_a_F_16")
    ]);

    console.log(3);

    await page.focus(
      'input[class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all"]'
    );
    await page.keyboard.type("registro");

    await page.focus('td[class="coluna4"] > input');
    await page.keyboard.type("PGU");

    await page.focus('td[class="coluna6"] > input');
    await page.keyboard.type("CPF");

    await page.focus('tr:nth-child(2)> td[class="coluna2"] > input');
    await page.keyboard.type("CNPJ");

    console.log(4);

    const Href = await page.evaluate(() => {
      let href = document
        .querySelector(
          'a[class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only botao"]'
        )
        .getAttribute("href");
      return href;
    });

    console.log(5);

    let urlBase =
      "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/detran/";
    var pdf1 = urlBase + Href;
    let relatorioLinhaDeVIdaNome =
      CPFformat + "_" + sysdateFormat + "_" + "Detran1.pdf";

    var options = {
      directory: pathPDF,
      filename: relatorioLinhaDeVIdaNome
    };

    download(pdf1, options, function(err) {
      if (err) throw err;
    });
    let relatorioLinhaDeVIda =
      pathPDF + CPFformat + "_" + sysdateFormat + "_" + "Detran1.pdf";

    /* ######### SALVANDO PDF 2 ############# **/
    await Promise.all([
      page.waitForNavigation(),
      page.waitForSelector("#navigation_a_M_18"),
      await page.hover("#navigation_a_M_18"),
      page.click("#navigation_a_F_18")
    ]);

    console.log(6);

    await page.focus(
      'input[class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all"]'
    );
    await page.keyboard.type("PLACA");

    await page.focus(
      'input[class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all"]'
    );
    await page.keyboard.type("CPF OU CNPJ");

    console.log(7);

    const Href2 = await page.evaluate(() => {
      let href = document
        .querySelector(
          'a[class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only botao"]'
        )
        .getAttribute("href");
      return href;
    });

    var pdf2 = urlBase + Href2;
    let relatorioVeiculoNome =
      CPFformat + "_" + sysdateFormat + "_" + "Detran2.pdf";

    var options = {
      directory: pathPDF,
      filename: relatorioVeiculoNome
    };

    console.log(8);

    download(pdf2, options, function(err) {
      if (err) throw err;
    });
    let relatorioVeiculo =
      pathPDF + CPFformat + "_" + sysdateFormat + "_" + "Detran2.pdf";

    /** ############## salvando imagem ############## */
    await Promise.all([
      page.waitForNavigation(),
      page.waitForSelector("#navigation_a_M_16"),
      await page.hover("#navigation_a_M_16"),
      page.click('a[href="pagina4-pesquisa-imagem-cnh.html"]')
    ]);

    console.log(9);

    await page.focus(
      'input[class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all"]'
    );
    await page.keyboard.type("registroPGU");

    await page.focus(
      'input[class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all"]'
    );
    await page.keyboard.type("CPF");

    console.log(10);

    const newPage2Promise = new Promise(x =>
      browser.once("targetcreated", target => x(target.page()))
    );
    await page.click('a > span[class="ui-button-text ui-c"]');
    const newPage2 = await newPage2Promise;

    var data2 = newPage2.url();

    console.log(11);

    let pageImagem = await browser.newPage();
    pageImagem.setViewport({ width: 1400, height: 1200, deviceScaleFactor: 2 });
    await pageImagem.goto(data2, { waitUntil: "networkidle2" });

    console.log(12);

    await pageImagem.screenshot({
      path: pathImages + CPFformat + "_" + sysdateFormat + "_" + "detran.png",
      clip: { x: 410, y: 340, width: 767, height: 400 }
    });
    let detranPathImg =
      pathImages + CPFformat + "_" + sysdateFormat + "_" + "detran.png";

    console.log(13);

    pageImagem.close();

    console.log(14);

    let detranPathPdf = [relatorioLinhaDeVIda, relatorioVeiculo];

    await page.close();
    let dataFim = {
      detranPathPdf,
      detranPathImg
    };

    console.log(15);

    return dataFim;
  } catch (error) {
    console.log(error);
    await page.close();
    return { errorDetran: "Ocorreu um erro" };
  }
};

module.exports = detran;
