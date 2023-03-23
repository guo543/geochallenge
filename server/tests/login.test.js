// import supertest from 'supertest'
import app from '../index.js'
import request from 'supertest'
import {jest} from '@jest/globals'
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcryptjs";


describe("POST /user/signin", () => {
    let mockUser = {
        email: "abc@purdue.edu",
        password: bcrypt.hashSync("123", 12),
        _id: 1
    }

    jest.spyOn(User, 'findOne')
        .mockImplementation(() => Promise.resolve( mockUser ))
    jest.spyOn(jwt, 'sign')
        .mockReturnValue(null);

    describe("given incorrect password", () => {
        test("Return status: 404", async () => {
            const response = await request(app).post("/user/signin").send(
                {
                    email: "abc@purdue.edu",
                    password: "asd"
                }
            )
            expect(response.statusCode).toBe(404);
        })
    })

    describe("username and password missing", () => {
        test("Return status: 500", async () => {
            const response = await request(app).post("/user/signin").send(
                {}
            )
            expect(response.statusCode).toBe(500);
        })
        
    })

    describe("correct username and password", () => {
        test("Return status: 200", async () => {
            const response = await request(app).post("/user/signin").send(
                {
                    email: "abc@purdue.edu",
                    password: "123"
                }
            )
            expect(response.statusCode).toBe(200);
        })
    })

    afterAll(() => jest.restoreAllMocks());
})