import app from '../app';
import request from 'supertest';
import { expect } from '@jest/globals';

test('GET api/auth', async () => {
    expect.assertions(2);
    const res = await request(app).get('/api/auth').send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ authenticated: false });
});

describe('register/login flow', () => {
    test('POST api/register success', async () => {
        const payload = { username: 'bob', password: 'bob', confirmPassword: 'bob' }
        await request(app).post('/api/register').send(payload)
            .expect(302)
            .expect('Location', '/proto-profile')
    })

    test('POST api/register bad username', async () => {
        const payload = { username: '@dam', password: 'bob', confirmPassword: 'bob' }
        await request(app).post('/api/register').send(payload)
            .expect(302)
            .expect('Location', '/register')
    })

    test('POST api/register bad pass', async () => {
        const payload = { username: '@dam', password: '%ob', confirmPassword: '%ob' }
        await request(app).post('/api/register').send(payload)
            .expect(302)
            .expect('Location', '/register')
    })

    test('POST api/register mismatch pass', async () => {
        const payload = { username: '@dam', password: 'bob', confirmPassword: 'cob' }
        await request(app).post('/api/register').send(payload)
            .expect(302)
            .expect('Location', '/register')
    })
})

// test('POST api/login', async () => {
//     expect.assertions(2);
//     const payload = { username: 'bob', keyboard }
//     const res = await request(app).post('/api/sample').send(payload);

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toEqual({ echo: payload.message });
// });