import puppeteer from 'puppeteer';

//TODO: maybe need to do classes for inheritance or so?

/**
 * Importing via Pupeteer going to download CSV file
 */
const WestpacImportDataCSV = async () => {};

const WestpacImportDataScanWebsites = async () => {};

const clear = async (page: puppeteer.Page) => {
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
};

//TODO: should make startdate not optional
//TODO: should check that startdate is not older than 3 years or throw error
const ImportData = async (startDate?: Date, endDate?: Date) => {
  let e = startDate || new Date();
  let year = new Date(e).getFullYear();
  let month = new Date(e).getMonth();
  let day = new Date(e).getDate();
  let date = startDate
    ? new Date(year, month, day)
    : new Date(year - 3, month, day);
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  // set user agent (override the default headless User Agent)
  //headless:      Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/93.0.4577.0 Safari/537.36
  //not headless:  Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.0 Safari/537.36
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.0 Safari/537.36',
  );
  await page.goto(
    'https://banking.westpac.com.au/wbc/banking/handler?fi=wbc&TAM_OP=login&segment=personal&logout=false',
  );
  // const html = await page.content();
  // await writeFile('./content.html', html);
  await page.waitForSelector('#fakeusername');
  await page.type('#fakeusername', process.env.WESTPAC_USERNAME!, {
    delay: 100,
  });
  await page.type('#password', process.env.WESTPAC_PASSWORD!, { delay: 100 });
  await page.click('#signin');
  await page.waitForNavigation();

  await page.goto(
    'https://banking.westpac.com.au/secure/banking/reportsandexports/exportparameters/2/',
  );
  await page.focus('#DateRange_StartDate');
  await clear(page);

  await page.type('#DateRange_StartDate', date.toLocaleDateString());
  await page.type('#Accounts_1', 'westpac choice\r', {
    delay: 150,
  });

  await page.keyboard.press('Enter'); // Enter Key

  try {
    await page.on('response', async (response) => {
      let request = await response.request();

      if (
        request.url() ===
        'https://banking.westpac.com.au/secure/banking/reportsandexports/getexportdata'
      ) {
      }

      if (request.resourceType() == 'document') {
        request;
        let resp = request.response();
      }
    });
  } catch (error) {}
  await page.click('#form-displayreportdata > div.btn-actions > button');
  await page.waitForTimeout(5 * 1000);

  let alertSelector = '#alertManagerArea > div > div.alert-icon > p';
  let alertMessage = '';
  try {
    await page.waitForSelector(alertSelector);
    let element = await page.$(alertSelector);
    alertMessage = await page.evaluate((el) => el.textContent, element);
    alertMessage = alertMessage.trim();
  } catch (error) {
    //no alert box displayed
  } finally {
    await browser.close();
  }

  if (alertMessage.length > 0) {
    throw new Error(alertMessage);
  }
};

export const ImportService = { ImportData };
