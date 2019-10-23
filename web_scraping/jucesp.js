// const puppeteer = require('puppeteer');

const jucesp = async browser => {
  const moment = require("moment");
  let sysdateFormat = moment().format("DD-MM-YYYY_HH-mm-ss");
  let CPFformat = "1234566";
  const download = require("download-file");

  console.log("entrou jucesp");

  let pathPDF = __filesPath + "/PDFs/";

  let url =
    "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/jucesp/index.html";

  let urlBase =
    "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/jucesp/";

  let page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.focus("#ctl00_cphContent_frmBuscaSimples_txtPalavraChave");
    await page.keyboard.type("teste");

    await Promise.all([
      page.waitForNavigation(),
      page.click(
        "#ctl00_cphContent_frmBuscaSimples_pnlBuscaSimples > table > tbody > tr > td.item02 > input[type=submit]"
      )
    ]);

    await page.focus(
      "#formBuscaAvancada > table > tbody > tr:nth-child(1) > td > div > div:nth-child(2) > label > input"
    );
    await page.keyboard.type("pesquisar");

    await Promise.all([
      page.waitForNavigation(),
      page.click(
        "#formBuscaAvancada > table > tbody > tr:nth-child(2) > td > input"
      )
    ]);

    await Promise.all([
      page.waitForNavigation(),
      page.click(
        "#ctl00_cphContent_gdvResultadoBusca_gdvContent_ctl02_lbtSelecionar"
      )
    ]);

    const Href = await page.evaluate(() => {
      let href = document
        .querySelector("#ctl00_cphContent_frmPreVisualiza_UpdatePanel2 > input")
        .getAttribute("onclick");
      return href;
    });
    //window.location='pagina6-ficha-cadastral-simplificada-relatorio.pdf'
    var HrefTratada = Href.split("='")[1].split("'")[0];
    var pdf1 = urlBase + encodeURIComponent(HrefTratada);

    let jucespPdf = CPFformat + "_" + sysdateFormat + "_" + "jucesp.pdf";

    var options = {
      directory: pathPDF,
      filename: jucespPdf
    };

    const jucespPathPdf = "/static/PDFs/" + jucespPdf;

    download(pdf1, options, function(err) {
      if (err) throw err;
    });

    let data = await page.evaluate(() => {
      let tipoDeEmpresa = document.querySelector(
        'span[id="ctl00_cphContent_frmPreVisualiza_lblDetalhes"]'
      ).innerText;
      let dataDaConstituicao = document.querySelector(
        'span[id="ctl00_cphContent_frmPreVisualiza_lblConstituicao"]'
      ).innerText;
      let inicioDaAtividade = document.querySelector(
        'span[id="ctl00_cphContent_frmPreVisualiza_lblAtividade"]'
      ).innerText;
      let cnpj = document.querySelector(
        'span[id="ctl00_cphContent_frmPreVisualiza_lblCnpj"]'
      ).innerText;
      let capital = document.querySelector(
        'span[id="ctl00_cphContent_frmPreVisualiza_lblCapital"]'
      ).innerText;
      let logradouro = document.querySelector(
        'span[id="ctl00_cphContent_frmPreVisualiza_lblLogradouro"]'
      ).innerText;
      let bairro = document.querySelector(
        'span[id="ctl00_cphContent_frmPreVisualiza_lblBairro"]'
      ).innerText;
      let municipio = document.querySelector(
        'span[id="ctl00_cphContent_frmPreVisualiza_lblMunicipio"]'
      ).innerText;
      let numero = document.querySelector(
        'span[id="ctl00_cphContent_frmPreVisualiza_lblNumero"]'
      ).innerText;
      let complemento = document.querySelector(
        'span[id="ctl00_cphContent_frmPreVisualiza_lblComplemento"]'
      ).innerText;
      let cep = document.querySelector(
        'span[id="ctl00_cphContent_frmPreVisualiza_lblCep"]'
      ).innerText;
      let uf = document.querySelector(
        'span[id="ctl00_cphContent_frmPreVisualiza_lblUf"]'
      ).innerText;
      let nomeDaEmpresa = document.querySelector(
        "#ctl00_cphContent_frmPreVisualiza_lblEmpresa"
      ).innerText;
      //let texto = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblDetalhes"]').getAttribute("value");
      return {
        tipoDeEmpresa,
        dataDaConstituicao,
        inicioDaAtividade,
        cnpj,
        capital,
        logradouro,
        bairro,
        municipio,
        numero,
        complemento,
        cep,
        uf,
        nomeDaEmpresa
      };
    });

    await page.close();

    return Object.assign({ jucespPathPdf }, data);
  } catch (error) {
    await page.close();
    return { errorJucesp: "Ocorreu um erro" };
  }
};

module.exports = jucesp;
