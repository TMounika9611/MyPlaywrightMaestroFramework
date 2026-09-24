import {Page} from "@playwright/test";
export class CartPage {
    constructor(private page: Page) {}
    async fillInfo(fname: string, lname: string, zip: string){
        await this.page.locator('[data-test="firstName"]').fill(fname);
        await this.page.locator('[data-test="lastName"]').fill(lname);
        await this.page.locator('[data-test="postalCode"]').fill(zip);
    }
    async finish(){
        await this.page.locator('[data-test="finish"]').click();    
    }
    async getSuccessMessage(){
        return await this.page.locator('.complete-header').textContent();
    }
}