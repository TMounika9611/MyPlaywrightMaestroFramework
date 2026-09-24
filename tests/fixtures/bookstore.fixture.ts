import { test as base } from '@playwright/test';
import { BookstoreAPI } from '../api/bookstore.api';

type Fixtures = {
  bookstoreApi: BookstoreAPI;
  bookstoreUser: { userId: string; token: string; username: string; password: string };
}

export const test = base.extend<Fixtures>({
  bookstoreApi: async ({ request }, use) => {
    await use(new BookstoreAPI(request));
  },

  bookstoreUser: async ({ bookstoreApi }, use) => {
    const username = `test_${Date.now()}`;
    const password = 'Test@1234!Aa';
    const user = await bookstoreApi.createUser(username, password);
    const tokenRes = await bookstoreApi.generateToken(username, password);
    await use({ userId: user.body.userID, token: tokenRes.token, username, password });
  }
});
export const expect = test.expect;