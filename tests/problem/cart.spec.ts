import {test, expect} from '@playwright/test';
test.describe('Problem User - Team Member @regression', () => {
    test('cart badge works but images are broken @regression', async ({page}) => {
        await page.goto('/inventory.html');
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });
});