const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeAll(async () => {
  // Set up database connection or any other setup needed for testing
  await db.connect();
});

afterAll(async () => {
  // Clean up after testing
  await db.end();
});

describe('GET /companies', () => {
  test('It should respond with a list of companies', async () => {
    const response = await request(app).get('/companies');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('companies');
    expect(response.body.companies).toBeInstanceOf(Array);
  });
});

describe('GET /companies/:code', () => {
  test('It should respond with a specific company', async () => {
    const response = await request(app).get('/companies/apple');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('company');
    expect(response.body.company).toHaveProperty('code');
    expect(response.body.company).toHaveProperty('name');
    expect(response.body.company).toHaveProperty('description');
  });

  test('It should respond with a 404 status for an invalid company code', async () => {
    const response = await request(app).get('/companies/invalid_code');
    expect(response.statusCode).toBe(404);
  });
});

describe('POST /companies', () => {
  test('It should create a new company', async () => {
    const newCompany = {
      name: 'New Company',
      description: 'A new company description',
    };
    const response = await request(app).post('/companies').send(newCompany);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('company');
    expect(response.body.company).toHaveProperty('code');
    expect(response.body.company).toHaveProperty('name', newCompany.name);
    expect(response.body.company).toHaveProperty('description', newCompany.description);
  });
});

describe('PUT /companies/:code', () => {
  test('It should update an existing company', async () => {
    const updatedCompany = {
      name: 'Updated Company',
      description: 'An updated company description',
    };
    const response = await request(app).put('/companies/apple').send(updatedCompany);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('company');
    expect(response.body.company).toHaveProperty('code');
    expect(response.body.company).toHaveProperty('name', updatedCompany.name);
    expect(response.body.company).toHaveProperty('description', updatedCompany.description);
  });

  test('It should respond with a 404 status for an invalid company code', async () => {
    const response = await request(app).put('/companies/invalid_code');
    expect(response.statusCode).toBe(404);
  });
});

describe('DELETE /companies/:code', () => {
  test('It should delete an existing company', async () => {
    const response = await request(app).delete('/companies/apple');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'deleted');
  });

  test('It should respond with a 404 status for an invalid company code', async () => {
    const response = await request(app).delete('/companies/invalid_code');
    expect(response.statusCode).toBe(404);
  });
});
