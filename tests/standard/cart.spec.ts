import {test, expect} from '@playwright/test';
test.describe('Standard User - Team Lead @smoke @regression', () => {
    test('add 2 items to cart @smoke', async ({page}) => {
        await page.goto('/inventory.html');
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    });
    test('Complete checkout @regression', async ({page}) => {
        await page.goto('/cart.html');
        await page.click('[data-test="checkout"]');
        await page.fill('[data-test="firstName"]', 'Aviva');
        await page.fill('[data-test="lastName"]', 'Lead');
        await page.fill('[data-test="postalCode"]', '560001');
        await page.click('[data-test="continue"]');
        await page.click('[data-test="finish"]');
        await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
    });
})