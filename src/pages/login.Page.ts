import {Page} from "@playwright/test";
export class LoginPage{
    constructor(private page: Page) {}
    async goto(){
        await this.page.goto('/');
    }
    async login(username: string, password: string) {
        await this.page.locator('#user-name').fill(username);
        await this.page.locator('#password').fill(password);
        await this.page.locator('#login-button').click();
    }   
    async getError(){
        return await this.page.locator('[data-test="error"]').textContent();
    }
    async isInventoryVisible(){
        return await this.page.locator('.inventory_list').isVisible();
    }
}