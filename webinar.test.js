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
     test('1 - Open', async() => {        
         const context = await browser.newContext();
         page = await context.newPage();
         await page.goto('https://the-internet.herokuapp.com/');
     });
    test('2 - Add/Remove', async () => {
        await page.click('[href="/add_remove_elements/"]');
        await page.click('button[onclick="addElement()"]');
        await page.waitForSelector('.added-manually');
    });
    test('3 - Auth', async() => {
        const context = await browser.newContext({
            httpCredentials: {
                username: 'admin',
                password: 'admin',
            }
        });
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/basic_auth');
    });
    test('4 - Checkbox', async() => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/checkboxes');
        await page.check('#checkboxes > input[type=checkbox]:nth-child(1)');
        await page.uncheck('#checkboxes > input[type=checkbox]:nth-child(3)');
    });
    test('5 - Context', async() => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/context_menu');
        page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept(); 
        });
        await page.click("#hot-spot", {button: 'right'});       
    });
    test('6 - Digest Auth', async() => {
        const context = await browser.newContext({
            httpCredentials: {
                username: 'admin',
                password: 'admin',
            }
        });
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/digest_auth');
        await page.waitForTimeout(2000);
    });
    test('7 - Dropdown', async() => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/dropdown');
        await page.selectOption('#dropdown', '1');
    });
    test('8 - Dynamic Controls', async() => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
        await page.click('#input-example > button');
        await page.waitForSelector('#input-example > input[type=text]:not([disabled])');
    });
    test('9 - Login', async() => {
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.type('#username', 'tomsmith', {slowMo:1});   
        await page.type('#password', 'SuperSecretPassword!');
        await page.click('#login > button > i');
        await page.waitForSelector('#content > div > a > i');
    });
    test('10 - Notification', async() => {
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/notification_message_rendered');
        await page.click('#content > div > p > a');
        await page.waitForSelector('#flash', 'text=Action successful');
    });     
    test('11 - Mobile', async() => {
        const { chromium, devices } = require('playwright');
        const browser = await chromium.launch({headless:false, slowMo:1000});
        const iPhone6 = devices['iPhone 6'];
        const context = await browser.newContext({
            ...iPhone6
        });
        page = await context.newPage();
        await page.goto('https://github.com/');
        await page.click('body > div.position-relative.js-header-wrapper > header > div > div.d-flex.flex-justify-between.flex-items-center > div.d-flex.flex-items-center > button > svg');
        await page.click('body > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu.HeaderMenu--logged-out.position-fixed.top-0.right-0.bottom-0.height-fit.position-lg-relative.d-lg-flex.flex-justify-between.flex-items-center.flex-auto > div.d-lg-flex.flex-items-center.px-3.px-lg-0.text-center.text-lg-left > a.HeaderMenu-link.d-inline-block.no-underline.border.border-gray-dark.rounded-1.px-2.py-1');
        await page.waitForTimeout(2000);
    });
    test('12 - NewWindow', async() => {
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/windows');
        await page.click('#content > div > a');
        
        const pages = context.pages();
        const page2 = pages[1];
        await page2.waitForSelector('body > div > h3', {timeout: 3000});
    });
    test('13 - keyPress', async() => {
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/key_presses');
        await page.keyboard.press('A');
        await page.waitForSelector('text=You entered: A');
        await page.keyboard.press('Enter');
        await page.waitForSelector('text=You entered: Enter');
    });    
    test('14 - Upload', async() => {
            page = await context.newPage();
            await page.goto('https://the-internet.herokuapp.com/upload');
            await page.setInputFiles('#file-upload', 'fileForUploadTest.txt');
            await page.click('#file-submit');
    });
    test('15 - Alert', async() => {
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
        page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept(); 
        });
        await page.click('#content > div > ul > li:nth-child(1) > button');
    });          
});