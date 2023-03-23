// import supertest from 'supertest'
import app from '../index.js'
import request from 'supertest'
import User from "../models/user.js";
import jwt from "jsonwebtoken";


describe("POST /user/signup", () => {
    describe("given existing username and password", () => {
        let mockUser = {
            email: "xiong109@purdue.edu",
            password: "12345678",
            _id: 1
        }

        jest.spyOn(User, 'findOne')
            .mockImplementationOnce(() => Promise.resolve( mockUser ))
            
        test("Return status: 404", async () => {
            const response = await request(app).post("/user/signup").send(
                {
                    email: "xiong109@purdue.edu",
                    password: "12345678"
                }
            )

            expect(response.statusCode).toBe(400);

        })
    })

    describe("Valid username and password", () => {
        let mockUser = {
            email: "white706@purdue.edu",
            password: "12345678"
        };

        jest.spyOn(User, 'findOne')
            .mockImplementationOnce(null);

        jest.spyOn(User, 'create')
            .mockImplementationOnce(() => Promise.resolve( mockUser ));

        jest.spyOn(jwt, 'sign')
            .mockImplementationOnce(null);

        test("Return status: 200", async () => {
            const response = await request(app).post("/user/signup").send(
                {
                    email: "white706@purdue.edu",
                    password: "12345678"
                }
            )
            expect(response.statusCode).toBe(200);

        })
    })
})