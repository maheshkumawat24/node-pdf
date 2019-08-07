const puppeteer = require('puppeteer');

(async function () {
    try {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(
            `
            <h1>Hello, There!</h1>
            <h3>Welcome from EPM Server ...</h3>
            `
        );
        await page.emulateMedia('screen');

        await page.pdf({
            path: 'assets/test/test.pdf',
            format: 'A4',
            printBackground: true
        });

        console.log("Done.");
        await browser.close();
        process.exit();

    }
    catch (error) {
        if (error) {
            throw error;
        }
    }
})();