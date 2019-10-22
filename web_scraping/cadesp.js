const cadesp = async browser => {
  console.log("entrou cadesp");

  let url =
    "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/cadesp/login.html";

  let page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.focus("#ctl00_conteudoPaginaPlaceHolder_loginControl_UserName");
    await page.keyboard.type("login");
    await page.focus("#ctl00_conteudoPaginaPlaceHolder_loginControl_Password");
    await page.keyboard.type("senha");
    await page.click(
      "#ctl00_conteudoPaginaPlaceHolder_loginControl_loginButton"
    );

    await page.waitForSelector(
      "#ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperiorn1"
    );
    await page.hover(
      "#ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperiorn1"
    );
    await page.click(
      "#ctl00_menuPlaceHolder_menuControl1_LoginView1_menuSuperiorn8 > td > table > tbody > tr > td > a"
    );

    await page.waitForSelector(
      "#ctl00_conteudoPaginaPlaceHolder_tcConsultaCompleta_TabPanel1_lstIdentificacao"
    );
    await page.select(
      "#ctl00_conteudoPaginaPlaceHolder_tcConsultaCompleta_TabPanel1_lstIdentificacao",
      "2"
    );
    await page.focus(
      "#ctl00_conteudoPaginaPlaceHolder_tcConsultaCompleta_TabPanel1_txtIdentificacao"
    );
    await page.keyboard.type("CNPJ");
    await page.waitForSelector(
      "#ctl00_conteudoPaginaPlaceHolder_tcConsultaCompleta_TabPanel1_btnConsultarEstabelecimento"
    );
    await page.click(
      "#ctl00_conteudoPaginaPlaceHolder_tcConsultaCompleta_TabPanel1_btnConsultarEstabelecimento"
    );

    await page.waitForSelector(
      "#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2)"
    );

    const data = await page.evaluate(() => {
      let ie = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2)"
      ).innerText;
      let cnpj = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(3) > td:nth-child(2)"
      ).innerText;
      let nomeEmpresarial = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(2)"
      ).innerText;
      let drt = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(5) > td:nth-child(2)"
      ).innerText;

      let situacao = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(3)"
      ).innerText;
      let dtInscricaoEstado = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(3) > td:nth-child(3)"
      ).innerText;
      let regimeEstadual = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3)"
      ).innerText;
      let postoFiscal = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlCabecalho > tbody > tr > td > table > tbody > tr:nth-child(5) > td:nth-child(3)"
      ).innerText;

      let nomeFantasia = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td.dadoDetalhe"
      ).innerText;
      let nire = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td.dadoDetalhe"
      ).innerText;
      let situacaoCadastral = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(7) > td:nth-child(2)"
      ).innerText;
      let ocorrenciaFiscal = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(8) > td:nth-child(2)"
      ).innerText;
      let tipoUnidade = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(10) > td:nth-child(2)"
      ).innerText;

      let dtInicioIE = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td:nth-child(4)"
      ).innerText;
      let dtInicioSituacao = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(7) > td:nth-child(4)"
      ).innerText;
      let formasAtuacao = document.querySelector(
        "#ctl00_conteudoPaginaPlaceHolder_dlEstabelecimentoGeral_ctl01_dlEstabelecimentoFormasAtuacao > tbody > tr > td > table > tbody > tr > td"
      ).innerText;

      return {
        ie,
        cnpj,
        nomeEmpresarial,
        drt,
        situacao,
        dtInscricaoEstado,
        regimeEstadual,
        postoFiscal,
        nomeFantasia,
        nire,
        situacaoCadastral,
        ocorrenciaFiscal,
        tipoUnidade,
        dtInicioIE,
        dtInicioSituacao,
        formasAtuacao
      };
    });

    await page.close();

    return data;
  } catch (error) {
    await page.close();
    return { errorCadesp: "Ocorreu um erro" };
  }
};

module.exports = cadesp;
