// import supertest from 'supertest'
import app from '../index.js'
import request from 'supertest'
import {jest} from '@jest/globals'
import jwt from "jsonwebtoken";
import User from "../models/user.js";


describe("POST /user/signin", () => {
    // describe("given incorrect password", () => {
    //     let mockUser = {
    //         email: "xiong109@purdue.edu",
    //         password: "ajsdofpasdf",
    //         _id: 1
    //     }
    //     jest.spyOn(User, 'findOne')
    //         .mockImplementationOnce(() => Promise.resolve( mockUser ))

    //     test("Return status: 404", async () => {
    //         const response = await request(app).post("/user/signin").send(
    //             {
    //                 email: "xiong109@purdue.edu",
    //                 password: "asd"
    //             }
    //         )

    //         expect(response.statusCode).toBe(404);
    //     })
    // })

    // describe("username and password missing", () => {
    //     test("Return status: 500", async () => {
    //         const response = await request(app).post("/user/signin").send(
    //             {}
    //         )
    //         expect(response.statusCode).toBe(500);
    //     })
        
    // })

    describe("correct username and password", () => {
        let mockUser = {
            email: "xiong109@purdue.edu",
            password: "12345678",
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
                    password: "12345678"
                }
            )
            expect(response.statusCode).toBe(200);
        })
    })
})