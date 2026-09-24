import { test as setup } from '@playwright/test';
const file='./playwright/.auth/perf.json';
setup('auth as performance_glitch_user', async ({ page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('performance_glitch_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.waitForURL('**/inventory.html');
    await page.context().storageState({ path: file });
});