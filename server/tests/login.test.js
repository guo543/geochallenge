// import supertest from 'supertest'
import app from '../index.js'
import request from 'supertest'
import {jest} from '@jest/globals'
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcryptjs";


describe("POST /user/signin", () => {
    describe("given incorrect password", () => {
        let mockUser = {
            email: "xiong109@purdue.edu",
            password: "ajsdofpasdf",
            _id: 1
        }
        jest.spyOn(User, 'findOne')
            .mockImplementationOnce(() => Promise.resolve( mockUser ))

        test("Return status: 404", async () => {
            const response = await request(app).post("/user/signin").send(
                {
                    email: "xiong109@purdue.edu",
                    password: "asd"
                }
            )

            expect(response.statusCode).toBe(404);
        })

    })

    describe("correct username and password", () => {
        var password = "12345678";
        const hashedPassword = bcrypt.hashSync(password, 12);

        let mockUser = {
            email: "xiong109@purdue.edu",
            password: hashedPassword,
            _id: 1
        }

        jest.spyOn(User, 'findOne')
            .mockImplementationOnce(() => Promise.resolve( mockUser ))
        jest.spyOn(jwt, 'sign')
            .mockReturnValue(null);

        test("Return status: 200", async () => {
            const response = await request(app).post("/user/signin").send(
                {
                    email: "xiong109@purdue.edu",
                    password: password

                }
            )
            expect(response.statusCode).toBe(200);
        })
    })

    afterAll(() => jest.restoreAllMocks());
})