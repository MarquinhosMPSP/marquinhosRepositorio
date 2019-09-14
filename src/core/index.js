const { jucesp, siel, sivec, detran, arpenp } = require('../../WebScraping');
const Scraper = require('./model/scraper');

const run = async() => {
    let mainUrl = "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com"
    
    const scraper = new Scraper({
        headless: false
    });

    let isLogin = false

    try {
        await scraper.doCreate()
        
        scraper.doListen('request', (request) => {
            const frame = request.frame();
            if (!isLogin && frame.url() !== "about:blank") {
                isLogin = frame.url().includes('login')
                if(isLogin) {
                    scraper.doLogin()
                }
            }
        })
        //const portais = Promise.all([jucesp(browser), siel(browser), sivec(browser), arpenp(browser)])
        return await scraper.doRun(async (browser, page) => {
            await page.goto(mainUrl)
            const portais = Promise.all([arpenp(browser)])
                .then(async(data) => {
                    setTimeout(async() => {
                        await browser.close()
                    }, 3000)
                    
                    return data
                })
            return portais
        })
    } catch (error) {
        return error;
    }
};

module.exports = { run }
