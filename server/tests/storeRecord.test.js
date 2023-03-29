// import supertest from 'supertest'
import app from '../index.js'
import request from 'supertest'
import {jest} from '@jest/globals'
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { ObjectId } from 'mongodb'
import bcrypt from "bcryptjs";


describe("Test: Score Records", () => {
    let token = '';
    let mockUser = {
        email: "abc@purdue.edu",
        password: bcrypt.hashSync("abc", 12),
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
    
    beforeAll(async () => {
        const response = await request(app).post("/user/signin").send(
            {
                email: "abc@purdue.edu",
                password: "abc"
            }
        )
        console.log(response);
        token = response.body.token;
    });
        
    afterAll(() => jest.restoreAllMocks());
    
    describe("GET /user/getScoreRecords", () => {
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
    
    describe("PATCH /user/:id/updateScoreRecords", () => {
        describe("given valid user id and score", () => {
            test("Return status: 200", async () => {
                const mock = jest.spyOn(ObjectId, 'isValid')
                    .mockImplementation((id) => {
                        return id == 1;
                    });

                const response = await request(app)
                    .patch(`/user/${mockUser._id}/updateScoreRecords`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({ score: 100 });
                expect(response.statusCode).toBe(200);

                mock.mockRestore();
            })
        })

        describe("given invalid user id", () => {
            test("Return status: 404", async () => {
                const mock = jest.spyOn(ObjectId, 'isValid')
                    .mockImplementation((id) => {
                        console.log(id)
                        return id == 1;
                    });

                const response = await request(app)
                    .patch(`/user/-1/updateScoreRecords`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({ score: 100 });
                expect(response.statusCode).toBe(404);

                mock.mockRestore();
            })
        })


    })
})

