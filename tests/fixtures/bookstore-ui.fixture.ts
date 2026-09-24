import { test as base } from './bookstore.fixture';
import { BookstorePage } from '../../src/pages/bookstore.page';

export const test = base.extend<{ bookstorePage: BookstorePage }>({
  bookstorePage: async ({ page }:{page:any}, use:any) => {
    await use(new BookstorePage(page));
  }
});
export const expect = test.expect;