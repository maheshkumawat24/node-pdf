const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// /* Capture a screen and save as PDF */
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto("http://localhost:4300/pdf", {
//     waitUntil: "networkidle2"
//   });
//   await page.setViewport({
//     width: 1015,
//     height: 935
//   });
//   await page.emulateMedia("screen");
//   const pdf = await page.pdf({
//     path: "assets/test/epm.pdf",
//     format: "A4",
//     printBackground: false
//   });

//   process.stdout.write("PDF Captured.");
//   await browser.close();
//   return pdf;
// })();

async function printPdf() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:4300/pdf", {
    waitUntil: "networkidle2"
  });
  await page.setViewport({
    width: 1015,
    height: 935
  });
  await page.emulateMedia("screen");
  const pdf = await page.pdf({
    path: "assets/test/epm.pdf",
    format: "A4",
    printBackground: false
  });

  process.stdout.write("PDF Captured.");
  await browser.close();
  return pdf;
}

// app.get("/export/pdf", (req, res) => {
//   console.log(printPdf);
//   printPdf.then(pdf => {
//     res.set({
//       "Content-Type": "application/pdf",
//       "Content-Length": pdf.length
//     });
//     res.send(pdf);
//   });
// });

app.get("/export/pdf", (req, res) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:4300/pdf", {
      waitUntil: "networkidle2"
    });
    await page.setViewport({
      width: 1015,
      height: 935
    });
    await page.emulateMedia("screen");
    const pdf = await page.pdf({
      path: "assets/test/epm.pdf",
      format: "A4",
      printBackground: false,
      margin: {top : "10px" , left : "10px" , right : "10px", bottom : "10px"}
    });
    res.type("application/pdf");
    res.send(pdf);
    browser.close();
  })();
});

app.listen(3000);

/* Evaluate in the context of the page */
// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto('http://localhost:4200', {
//         waitUntil: 'networkidle2'
//     });

//     const dimensions = await page.evaluate(() => {
//         return {
//             width: document.documentElement.clientWidth,
//             height: document.documentElement.clientHeight,
//             deviceScaleFactor: window.devicePixelRatio
//         };
//     });

//     console.log("Dimensions: ", dimensions);

//     await browser.close();

// })();
