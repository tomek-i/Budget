import puppeteer, { Page } from 'puppeteer';

//TODO: maybe need to do classes for inheritance or so?

/**
 * Importing via Pupeteer going to download CSV file
 */
const WestpacImportDataCSV = async () => {


}

const WestpacImportDataScanWebsites = async () => {

}

const clear = async (page: puppeteer.Page) => {
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
}

const ImportData = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();


  await page.goto('https://banking.westpac.com.au/wbc/banking/handler?fi=wbc&TAM_OP=login&segment=personal&logout=false');
  await page.type("#fakeusername", process.env.WESTPAC_USERNAME!);
  await page.type("#password", process.env.WESTPAC_PASSWORD!);
  await page.click("#signin");
  await page.waitForNavigation();


  await page.goto('https://banking.westpac.com.au/secure/banking/reportsandexports/exportparameters/2/');
  await page.focus('#DateRange_StartDate');
  await clear(page);

  let e = new Date()
  let year = new Date(e).getFullYear();
  let month = new Date(e).getMonth();
  let day = new Date(e).getDate();
  let date = new Date(year - 3, month, day);


  await page.type('#DateRange_StartDate', date.toLocaleDateString());
  await page.type('#Accounts_1', 'westpac choice\r', {
    delay: 150
  });


  await page.keyboard.press('Enter'); // Enter Key

  try {
    await page.on('response', async (response) => {

      let request = await response.request();

      if (request.url() === 'https://banking.westpac.com.au/secure/banking/reportsandexports/getexportdata') {
        console.log("URL:", request.url());
        console.log("TYPE:", request.resourceType());
        console.log("METHOD:", request.method());
        console.log("REDIRECT:", request.redirectChain());
      }

      if (request.resourceType() == 'document') {
        request
        let resp = request.response();
        console.log('      DOCUMENT URL:', resp?.url());
      }
    });
  } catch (error) {
    console.error("ERROR", error);
  }
  await page.click("#form-displayreportdata > div.btn-actions > button",);
  await page.waitForTimeout(5 * 1000);
  await browser.close();
};

export const ImportService = { ImportData };
