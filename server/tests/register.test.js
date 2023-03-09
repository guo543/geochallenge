// import supertest from 'supertest'
import app from '../index.js'
import request from 'supertest'


describe("POST /user/signup", () => {
    describe("given invalid username and password", () => {
        test("Return status: 404", async () => {
            const response = await request(app).post("/user/signin").send(
                {
                    email: "asd@asd.edu",
                    password: "asd"
                }
            )

            expect(response.statusCode).toBe(404);

        })
    })
})