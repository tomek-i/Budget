import { writeFile } from 'fs';
import puppeteer from 'puppeteer';



const clear = async (page: puppeteer.Page) => {
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
}

const ImportData = async () => {
  //TODO: download from Westpac (csv file)

  console.log("BROWSER");

  //(async () => {
  const browser = await puppeteer.launch();
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
  // await page.click('#DateRange_EndDate');
  // await page.type('#DateRange_EndDate', >>>current date<<<);
  //await page.focus('#Accounts_1');
  await page.type('#Accounts_1', 'westpac choice');


  await page.keyboard.press('Enter'); // Enter Key
  // await page.keyboard.press('NumpadEnter'); // Numeric Keypad Enter Key
  // await page.keyboard.press('\n'); // Shortcut for Enter Key
  // await page.keyboard.press('\r'); // Shortcut for Enter Key

  //select from dropdown: 
  //await page.click("button[type=submit]");
  await page.click("#form-displayreportdata > div.btn-actions > button");

  page.waitForTimeout(5 * 1000);
  let str = await page.screenshot({ path: './screens/example.png' });
  let c = await page.content();

  writeFile("./screens/source.html", c, () => {

  });

  await browser.close();
  return str;
  //})();
};

export const ImportService = { ImportData };
