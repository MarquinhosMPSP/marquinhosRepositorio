(async () => {

    const Scraper = require('./controller/scraper')

    let url = "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com";
    
    const scraper = new Scraper({ headless: false })

    await scraper.doCreate()
    scraper.doListen('request', scraper.verifyIsLoginPage)

    await scraper.doRun((browser, page) => {
        // AJUSTAR SINCRONIA DO MÉTODO
        // page.goto(url)
        // console.log('finalizou');
    })
    

    debugger;

    await scraper.doClose();

})();

