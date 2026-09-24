import { Page, expect } from '@playwright/test';

export class BookstorePage {
  constructor(private page: Page) {}

  async gotoLogin() {
    await this.page.goto('https://demoqa.com/login');
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('UserName').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await expect(this.page.getByText(username).first()).toBeVisible({ timeout: 10000 });
  }

   async openBookByTitle(title: string) {
    await this.page.goto('https://demoqa.com/books');
    await this.page.waitForTimeout(5000); // DemoQA is slow, give it 5 sec

    await this.page.evaluate(() => {
      document.querySelectorAll('iframe, #fixedban, footer').forEach(e => e.remove());
    });

    // Direct click - waits up to 20 sec for the book link itself
    await this.page.getByRole('link', { name: title }).first().click({ timeout: 20000 });
    
    await this.page.waitForTimeout(2000);
    await this.page.evaluate(() => {
      document.querySelectorAll('iframe, #fixedban, footer').forEach(e => e.remove());
    });
  }

  async addToCollection() {
    await this.page.evaluate(() => {
      document.querySelectorAll('iframe, #fixedban, footer').forEach(e => e.remove());
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(1000);

    this.page.on('dialog', async d => {
      console.log('Dialog:', d.message());
      await d.accept();
    });

    await this.page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button'))
        .find(b => b.textContent?.trim() === 'Add To Your Collection');
      if (btn) (btn as HTMLElement).click();
    });
    await this.page.waitForTimeout(3000);
  }

  async gotoProfile() {
    await this.page.goto('https://demoqa.com/profile');
    await this.page.waitForTimeout(2000);
  }

  async verifyBookInProfile(title: string) {
    await this.page.evaluate(() => {
      document.querySelectorAll('iframe, #fixedban, footer').forEach(e => e.remove());
    });
    await this.page.waitForTimeout(2000);
    await expect(this.page.getByText(title).first()).toBeVisible({ timeout: 15000 });
  }

  async deleteAllBooks() {
    await this.page.evaluate(() => {
      document.querySelectorAll('iframe, #fixedban, footer').forEach(e => e.remove());
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(1000);
    
    const hasBooks = await this.page.getByText('No rows found').isHidden().catch(()=>true);
    if(hasBooks){
      this.page.once('dialog', d => d.accept());
      await this.page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Delete All Books'));
        if (btn) (btn as HTMLElement).click();
      });
      await this.page.waitForTimeout(1000);
      this.page.once('dialog', d => d.accept());
      await this.page.locator('#closeSmallModal-ok').click({ force: true }).catch(()=>{});
    }
  }
}