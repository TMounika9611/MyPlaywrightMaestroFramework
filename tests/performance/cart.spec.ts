import { test, expect} from '@playwright/test';
test.describe('Performance User - Supervisor @regression', () => {
    test('checkout with slow network @sanity', async ({ page }) => {
        test.slow();//triples timeouts for this user
        await page.goto('/inventory.html');
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });
});

