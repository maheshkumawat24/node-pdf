const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.use(function (req, res, next) {
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
      margin: { top: "25px", left: "10px", right: "10px", bottom: "110px" },
      displayHeaderFooter: true,
      printBackground : true,
      headerTemplate: "<div></div>",
      footerTemplate: `<div style='width:100%;margin-right:5%;margin-left:7%;color:#333333'>
                        <hr style="border: 0.5px solid;"/>
                        <div style='text-align:center;font-size:12px;margin-top:6px'>Thank you for using easypick MARKETING! </div>
                        <div style='width:100%'>
                          <div style='width:80%;display:inline-block'>
                            <div style='text-align:center;font-size:8px;margin-top:10px;color:#cccccc;margin-left:20%;'>url website: </div>
                            <div style='text-align:center;font-size:10px;margin-left:20%'>easypick.marketing</div>
                          </div>
                          <div style='width:19%;display:inline-block;text-align:right;color:black'>
                            <span style='font-size:16px;'>
                              <span class='pageNumber'>
                              </span>
                              /
                              <span class='totalPages'>
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      `,
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
