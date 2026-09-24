/*import {test,expect} from '@playwright/test';
import {CasePage} from '../../pages/case.page';
test.skip ('Validate SLA Pauce on Case Referral via API', async ({page})=>{
    //Network interception - advanced concept
    page.on('response', async (res)=>{
        if(res.url().includes('/cases/') && res.status()===200){
            const body=await res.json().catch(()=>null);
            console.log('SLA Status:', body?.slaPaused);
        }
    });
    //Collections concept
    const rows=page.locator('table tr');
    console.log('Cases in queue:', await rows.count());

    const casePage=new CasePage(page);
    await page.goto('https://example.com');
    //await casePage.referToL2();
    expect(true).toBeTruthy();
});*/
