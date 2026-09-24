import {Page} from "@playwright/test";

export class InventoryPage {
    constructor(private page: Page) {}
    async addToCartByIndex(index=0){
        await this.page.locator('[data-test^="add-to-cart"]').nth(index).click();
    }
    async openCart(){
        await this.page.locator('.shopping_cart_link').click();
    }
    async getTitle(){
        return await this.page.locator('.title').textContent();
    }
}