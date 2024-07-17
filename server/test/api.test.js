const app = require('../app')
const request = require('supertest');

describe('test API',()=>{
    test('status code', async()=>{
        const result = await request(app)
        .post("/weathersearch")
        .send({city:"Delhi"})
        expect(result.status).toBe(200)
    })
})