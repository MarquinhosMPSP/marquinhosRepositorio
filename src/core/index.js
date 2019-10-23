const {
  jucesp,
  siel,
  sivec,
  detran,
  cadesp,
  censec,
  infocrim,
  arpenp,
  caged,
  arisp
} = require("../../web_scraping");
const Scraper = require("./scraper");
const moongose = require("mongoose");
const moment = require("moment");
const Relatorio = moongose.model("relatorioModel");

const isValid = require("../helper/isValid");

module.exports = {
  async run(usuario, cpf, rg, nome, cnpj, empresa, nrprocesso, pispasep) {
    let mainUrl = "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com";

    let portalsToScrap = [
      {
        name: "jucesp",
        method: jucesp,
        valid: isValid(empresa),
        params: [empresa]
      },
      {
        name: "siel",
        method: siel,
        valid: isValid(nome) && isValid(nrprocesso),
        params: [nome, nrprocesso]
      },
      {
        name: "sivec",
        method: sivec,
        valid: isValid(rg) && isValid(nome),
        params: [rg, nome]
      },
      {
        name: "detran",
        method: detran,
        valid: isValid(cpf) || isValid(cnpj),
        params: [cpf || cnpj]
      },
      { name: "cadesp", method: cadesp, valid: isValid(cnpj), params: [cnpj] },
      {
        name: "censec",
        method: censec,
        valid: isValid(cpf) || isValid(cnpj),
        params: [cpf || cnpj]
      },
      { name: "infocrim", method: infocrim, valid: true, params: [] },
      {
        name: "arpenp",
        method: arpenp,
        valid: isValid(nrprocesso),
        params: [nrprocesso]
      },
      {
        name: "caged",
        method: caged,
        valid: isValid(cnpj) && isValid(pispasep),
        params: [cnpj, pispasep]
      },
      {
        name: "arisp",
        method: arisp,
        valid: isValid(cpf) || isValid(cnpj),
        params: [cpf || cnpj]
      }
    ];

    const scraper = new Scraper({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    let isLogin = false;

    try {
      await scraper.doCreate();

      // Verificando se é login
      scraper.doListen("request", request => {
        const frame = request.frame();
        if (!isLogin && frame.url() !== "about:blank") {
          isLogin = frame.url().includes("login");
          if (isLogin) scraper.doLogin();
        }
      });

      // Retornar dados
      return await scraper.doRun(async (browser, page) => {
        await page.goto(mainUrl);
        const portals = Promise.all(
          portalsToScrap
            .filter(item => item.valid)
            .map(obj => obj.method(browser, ...obj.params))
        ).then(async data => {
          await browser.close();
          const newObject = Object.assign({}, ...data);
          console.log(newObject);

          data = Object.assign(
            {
              usuario,
              dataRelatorio: moment()
                .utcOffset("-0300")
                .format("DD/MM/YYYY HH:mm:ss")
            },
            newObject,
            {
              falharam: Object.keys(newObject)
                .filter(item => item.match(/error/))
                .reduce((accum, curr) => [...accum, curr.split("error")[1]], [])
            },
            {
              sucesso: Object.keys(newObject)
                .filter(item => item.match(/success/))
                .reduce(
                  (accum, curr) => [...accum, curr.split("success")[1]],
                  []
                )
            }
          );
          const relatorio = await Relatorio.create(data);
          console.log(relatorio);
          return relatorio;
        });
        return portals;
      });
    } catch (error) {
      return error;
    }
  }
};
