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

module.exports = {
  async run(usuario) {
    let mainUrl = "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com";

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
        const portais = Promise.all([
          jucesp(browser),
          siel(browser),
          sivec(browser),
          cadesp(browser),
          censec(browser),
          infocrim(browser),
          arpenp(browser),
          caged(browser),
          detran(browser),
          arisp(browser)
        ]).then(async data => {
          await browser.close();
          data = Object.assign(
            {
              usuario,
              dataRelatorio: moment()
                .utcOffset("-0300")
                .format("DD/MM/YYYY HH:mm:ss")
            },
            ...data
          );
          const relatorio = await Relatorio.create(data);
          return relatorio;
        });
        return portais;
      });
    } catch (error) {
      return error;
    }
  }
};
