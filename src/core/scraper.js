const puppeteer = require('puppeteer');

function Scraper(config = null) {
    this.config = config;
}

Scraper.prototype.doCreate = async function () {
    this.browser = await puppeteer.launch(this.config);
    this.page = await this.browser.newPage();
}

Scraper.prototype.doRun = async function (cb) {
    try {
        return await cb(this.browser, this.page)
    } catch (error) {
        console.log(error);
        this.doClose();
    }
}

Scraper.prototype.doListen = async function (type, cb) {
    await this.page.on(type, request => cb(request));
}

Scraper.prototype.doClose = async function () {
    await this.browser.close()
}

Scraper.prototype.doLogin = async function () {
    await this.page.focus('#username')
    await this.page.keyboard.type('fiap')
    await this.page.focus('#password')
    await this.page.keyboard.type('mpsp')
    await this.page.evaluate(() => {
        document.querySelector('button').click();
    })
}

module.exports = Scraper