jest.setTimeout(120000);
const playwright = require("playwright-chromium");
let browser;
let context;

beforeAll( async() => {
    browser = await playwright.chromium.launch({headless:false, slowMo:1000});
});
beforeEach( async() => {
    context = await browser.newContext();
});
afterEach( async() => {
    await context.close();
});
afterAll( async() => {
    await browser.close();
});

describe('Tests',() => {
    let page;
    test('1 - iFrame', async() => {
        page = await context.newPage();
        await page.goto('https://www.w3schools.com/html/html_iframe.asp');
        const frames = await page.frames();
        const frame = frames[1];
        await frame.waitForSelector('iframe');
        await page.click('#main > div.w3-example > a');
        await frame.waitForSelector('iframe');
    });
    test('2 - Search', async() => {
        page = await context.newPage();
        await page.goto('https://bitaps.com/');
        await page.type('#search-box','544');
        await page.click('#sticky > div.container-fluid.col-xl-11 > div > div.col.search-box-wrap > div > div > span');
        await page.waitForTimeout(2000);
    });
    test('2 - Night Theme', async() => {
        page = await context.newPage();
        await page.goto('https://bitaps.com/');
        await page.click('#sticky > div.container-fluid.col-xl-11 > div > div.col.menu-picto-wrap.moon > i');
        await page.waitForTimeout(2000);
    });
    test('3 - Sound Switcher', async() => {
        page = await context.newPage();
        await page.goto('https://bitaps.com/');
        await page.click('#sound-switcher');
        await page.waitForTimeout(2000);
    });
    // test('4 - Map', async() => {
    //     page = await context.newPage();
    //     await page.goto('https://bitaps.com/');
    //     await page.mouse.move(900, 800);
    //     await page.mouse.down();
    //     await page.mouse.move(900, 750);
    //     await page.mouse.move(855, 750);
    //     await page.mouse.move(855, 800);
    //     await page.mouse.move(900, 800);
    //     await page.mouse.up();
    //     await page.waitForTimeout(2000);
    // });
    test('5 - Language', async() => {
        page = await context.newPage();
        await page.goto('https://bitaps.com/');
        await page.click('#rmenu');
        await page.click('#collapse-menu > div > div:nth-child(2) > div.col-lg-3.col-md-2.col-sm-3.col-xs-6.pt-4.pl-4 > div:nth-child(3) > a');
        await page.waitForSelector('text= Блок');
    });
    test('6 - Change currency', async() => {
        page = await context.newPage();
        await page.goto('https://bitaps.com/');
        await page.click('#top-menu > div.btn-group > div:nth-child(1) > div > a > div.bitcoin-logo');
        await page.click('#collapse-menu-net > a.dropdown-item.litecoin-logo-menu > div');
    });
    test('7 - Webcam', async() => {
        page = await context.newPage();
        await page.goto('https://bitaps.com/');
        page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept(); 
            });
        await page.click('#sticky > div.container-fluid.col-xl-11 > div > div.scan-qr');
        await page.waitForSelector('#search-bar-canvas');
    });
});