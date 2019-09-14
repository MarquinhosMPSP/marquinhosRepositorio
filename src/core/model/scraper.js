const puppeteer = require('puppeteer');

class Scraper {
    constructor(config) {
        this.config = config;
    }

    async doCreate() {
        this.browser = await puppeteer.launch(this.config);
        this.page = await this.browser.newPage();
    }

    async doRun(cb) {
        try {
            return await cb(this.browser, this.page)
        } catch (error) {
            this.doClose();
        }
    }

    async doListen(type, cb) {
        await this.page.on(type, request => cb(request));
    }

    async doClose() {
        await this.browser.close()
    }

    async doLogin() {
        await this.page.focus('#username')
        await this.page.keyboard.type('fiap')
        await this.page.focus('#password')
        await this.page.keyboard.type('mpsp')
        await this.page.evaluate(() => {
            document.querySelector('button').click();
        })
    }
}

module.exports = Scraper