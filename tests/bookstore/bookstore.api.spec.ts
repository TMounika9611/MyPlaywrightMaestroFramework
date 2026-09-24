import { test, expect } from '../fixtures/bookstore.fixture';

test.describe.serial('Bookstore Full CRUD', () => {

  test('full RBAC flow with cleanup', async ({ bookstoreApi, bookstoreUser }) => {
    // GET books
    const books = await bookstoreApi.getBooks();
    const isbn = books.books[0].isbn;
    console.log('Testing with ISBN:', isbn);

    // ADD book
    const addRes = await bookstoreApi.addBook(bookstoreUser.userId, bookstoreUser.token, isbn);
    console.log('Add status:', addRes.status());
    expect(addRes.status()).toBe(201);

    // VERIFY user has book
    const userRes = await bookstoreApi.getUser(bookstoreUser.userId, bookstoreUser.token);
    expect(userRes.body.books.length).toBe(1);

    // DELETE book
    const delBookRes = await bookstoreApi.deleteBook(bookstoreUser.userId, bookstoreUser.token, isbn);
    expect([200, 204].includes(delBookRes.status())).toBeTruthy();
    console.log('Delete book:', delBookRes.status());

    // DELETE user - cleanup
    const delUserRes = await bookstoreApi.deleteUser(bookstoreUser.userId, bookstoreUser.token);
    expect(delUserRes.status()).toBe(204);
  });
});
