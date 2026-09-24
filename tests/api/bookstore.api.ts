import { APIRequestContext } from '@playwright/test';

export class BookstoreAPI {
  constructor(private request: APIRequestContext) {}
  BASE = 'https://demoqa.com';

  async createUser(username: string, password: string) {
    const res = await this.request.post(`${this.BASE}/Account/v1/User`, {
      data: { userName: username, password }
    });
    return { status: res.status(), body: await res.json() };
  }

  async generateToken(username: string, password: string) {
    const res = await this.request.post(`${this.BASE}/Account/v1/GenerateToken`, {
      data: { userName: username, password }
    });
    return await res.json();
  }

  async getBooks() {
    const res = await this.request.get(`${this.BASE}/BookStore/v1/Books`);
    return await res.json();
  }

  async addBook(userId: string, token: string, isbn: string) {
    return await this.request.post(`${this.BASE}/BookStore/v1/Books`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { userId, collectionOfIsbns: [{ isbn }] }
    });
  }

  async deleteUser(userId: string, token: string) {
    return await this.request.delete(`${this.BASE}/Account/v1/User/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  async getUser(userId: string, token: string) {
  const res = await this.request.get(`${this.BASE}/Account/v1/User/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return { status: res.status(), body: await res.json() };
}

async deleteBook(userId: string, token: string, isbn: string) {
  return await this.request.delete(`${this.BASE}/BookStore/v1/Book`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { userId, isbn }
  });
}
}