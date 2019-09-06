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
            await cb(this.browser, this.page)
        } catch (error) {
            console.log(error);
        }
    }

    async doListen(type, cb) {
        await this.page.on(type, request => cb(request));
    }

    verifyIsLoginPage(request) {
        console.log('entrou no verify');
        
        let isLogin = false;
        const frame = request.frame();
        if (!isLogin && frame.url() !== "about:blank") {
            isLogin = frame.url().includes('login')
            if(isLogin) {
                console.log('Entrou no login');
                this.doLogin(page)
            }
        }
    }

    async doClose() {
        await this.browser.close()
    }

    async doLogin() {
        console.log('Fazendo login...');
        await this.page.focus('#username')
        await this.page.keyboard.type('fiap')
        await this.page.focus('#password')
        await this.page.keyboard.type('mpsp')
        await this.page.evaluate(() => {
            document.querySelector('button').click();
        })
        console.log('Finalizou...');
    }
}

module.exports = Scraper