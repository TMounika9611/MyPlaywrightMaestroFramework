import { test, expect } from '../fixtures/bookstore-ui.fixture';
test.setTimeout(60000);
test('Bookstore UI - Add and Delete book', async ({ bookstorePage, bookstoreUser, bookstoreApi }) => {
  // Get a book via API to know ISBN
  const booksData = await bookstoreApi.getBooks();
  const firstBook = booksData.books[0];
  console.log('Testing:',firstBook.title);
  const isbn = firstBook.isbn;
  const title = firstBook.title;

  console.log('Testing:', title, isbn);

  // 1. Login via UI with API-created user
  await bookstorePage.gotoLogin();
  await bookstorePage.login(bookstoreUser.username, bookstoreUser.password);

  // 2. Add book via UI
  await bookstorePage.openBookByTitle(firstBook.title);
  await bookstorePage.addToCollection();

  // 3. Verify in Profile
  await bookstorePage.gotoProfile();
  await bookstorePage.verifyBookInProfile(firstBook.title);

  // 4. Cleanup via UI
  await bookstorePage.deleteAllBooks();

  // 5. Final cleanup via API
  await bookstoreApi.deleteUser(bookstoreUser.userId, bookstoreUser.token);
});