(async () => {
    
    const Scraper = require('./controller/scraper')

    let url = "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com";
    
    const scraper = new Scraper({ headless: false })

    let isLogin = false;

    try {
        await scraper.doCreate()

        scraper.doListen('request', (page, request) => {
            const frame = request.frame();
            if (!isLogin && frame.url() !== "about:blank") {
                isLogin = frame.url().includes('login')
                if(isLogin) {
                    scraper.doLogin(page)
                }
            }
        })

        await scraper.doRun(async (browser, page) => {
            await page.goto(url)
        })
        
    } catch (error) { }

    debugger;
    await scraper.doClose();
})();

