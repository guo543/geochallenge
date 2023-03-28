// import supertest from 'supertest'
import app from '../index.js'
import request from 'supertest'
import {jest} from '@jest/globals'
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { ObjectId } from 'mongodb'


describe("GET /user/getScoreRecords", () => {
    let mockUser = {
        email: "abc@purdue.edu",
        password: "abc",
        recordCount: 1,
        records: [100],
        _id: 1
    }

    jest.spyOn(User, 'findOne')
        .mockImplementation(() => Promise.resolve( mockUser ))
    
    jest.spyOn(User, 'findByIdAndUpdate').
        mockImplementation((id, user, params) => {
            return user;
        });

    afterAll(() => jest.restoreAllMocks());

    describe("given existing email", () => {
        test("Return status: 200", async () => {
    
            const response = await request(app)
                .get("/user/getScoreRecords")
                .query({ email: 'abc@purdue.edu' })
                .send();
            expect(response.statusCode).toBe(200);

            // Check that the score record is consistent with the mock user
            const resUserInfo = response.body.result;
            expect(resUserInfo.recordCount === 1);
            expect(resUserInfo.records[0] === 100);
        })
    })

    describe("given non-existing email", () => {
        test("Return status: 200", async () => {
    
            const response = await request(app)
                .get("/user/getScoreRecords")
                .query({ email: 'abasdasdasdc@purdue.edu' })
                .send();

            expect(response.statusCode).toBe(404);
            expect(response.body.message === 'User doesn\'t exist.')
        })
    })
})
