const siel = async (browser, nome, nrprocesso) => {
  console.log("entrou siel");

  let page = await browser.newPage();

  let url =
    "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/siel/login.html";

  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.focus(
      "body > div.canvas > div.conteudo > div.mioloInterna.apps > form > table > tbody > tr:nth-child(1) > td:nth-child(2) > input[type=text]"
    );

    await page.keyboard.type("email@email");
    await page.focus(
      "body > div.canvas > div.conteudo > div.mioloInterna.apps > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type=password]"
    );
    await page.keyboard.type("senha");

    await Promise.all([
      page.waitForNavigation(),
      page.click(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > form > table > tbody > tr:nth-child(3) > td:nth-child(2) > input[type=submit]"
      )
    ]);

    await Promise.all([
      page.focus(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > form.formulario > fieldset:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(2) > input[type=text]"
      ),
      page.keyboard.type(nome)
    ]);

    await Promise.all([
      page.focus("#num_processo"),
      page.keyboard.type(nrprocesso)
    ]);

    await Promise.all([
      page.waitForNavigation(),
      page.click(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > form.formulario > table > tbody > tr > td:nth-child(2) > input"
      )
    ]);

    let data = await page.evaluate(() => {
      let nome = document.querySelector(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > table > tbody > tr:nth-child(2) > td:nth-child(2)"
      ).innerText;
      let titulo = document.querySelector(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > table > tbody > tr:nth-child(3) > td:nth-child(2)"
      ).innerText;
      let nascimento = document.querySelector(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > table > tbody > tr:nth-child(4) > td:nth-child(2)"
      ).innerText;
      let zona = document.querySelector(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > table > tbody > tr:nth-child(5) > td:nth-child(2)"
      ).innerText;
      let endereco = document.querySelector(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > table > tbody > tr:nth-child(6) > td:nth-child(2)"
      ).innerText;
      let municipio = document.querySelector(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > table > tbody > tr:nth-child(7) > td:nth-child(2)"
      ).innerText;
      let uf = document.querySelector(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > table > tbody > tr:nth-child(8) > td:nth-child(2)"
      ).innerText;
      let dataDomicilio = document.querySelector(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > table > tbody > tr:nth-child(9) > td:nth-child(2)"
      ).innerText;
      let nomePai = document.querySelector(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > table > tbody > tr:nth-child(10) > td:nth-child(2)"
      ).innerText;
      let nomeMae = document.querySelector(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > table > tbody > tr:nth-child(11) > td:nth-child(2)"
      ).innerText;
      let naturalidade = document.querySelector(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > table > tbody > tr:nth-child(12) > td:nth-child(2)"
      ).innerText;
      let cdValidacao = document.querySelector(
        "body > div.canvas > div.conteudo > div.mioloInterna.apps > table > tbody > tr:nth-child(13) > td:nth-child(2)"
      ).innerText;
      //let texto = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblDetalhes"]').getAttribute("value");
      return {
        nome,
        titulo,
        nascimento,
        zona,
        endereco,
        municipio,
        uf,
        dataDomicilio,
        nomePai,
        nomeMae,
        naturalidade,
        cdValidacao
      };
    });

    await page.close();

    return Object.assign(data, { successSiel: true });
  } catch (error) {
    await page.close();
    return { errorSiel: true };
  }
};

module.exports = siel;
