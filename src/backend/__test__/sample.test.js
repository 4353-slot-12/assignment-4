import app from '../app';
import request from 'supertest';
import SampleService from '../services/sample';
import { expect } from '@jest/globals';


test('jest + supertest sample', async () => {
    expect.assertions(2);
    const payload = { message: 'Hello from Jest!' }
    const res = await request(app).post('/api/sample').send(payload);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ echo: payload.message });
});


test('jest only sample', () => {
    const res = {
        statusCode: '',
        body: null,
        status: function(code) { 
            this.statusCode = code;
            return this; 
        },
        send: function(obj) { 
            this.body = obj; 
            return this; 
        },
    };

    const req = {
        body: {
            message: 'Hello from Jest!'
        }
    };

    SampleService.echoMessage(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ echo: req.body.message });
});