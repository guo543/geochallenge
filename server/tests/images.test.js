// import supertest from 'supertest'
import app from '../index.js'
import request from 'supertest'
import {jest} from '@jest/globals'
import jwt from "jsonwebtoken";
import Image from "../models/image.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { ObjectId } from 'mongodb'
import AWS from 'aws-sdk'

describe("Test: /image/", () => {
    let token = '';

    let mockImage = {
        name: "imgName",
        imageLat: 123,
        imageLon: 123,
        uploader: 123,
        numReports: 0,
        imageURL: "123.123.123",
        _id: 1
    }

    let mockUser = {
        email: "abc@purdue.edu",
        password: bcrypt.hashSync("123", 12),
        _id: 1
    }

    jest.spyOn(User, 'findOne')
        .mockImplementation(() => Promise.resolve( mockUser ))
    jest.spyOn(Image, 'find')
        .mockImplementation(() => Promise.resolve( mockImage ))

    
    // signin and get auth token
    beforeAll(async () => {
        const response = await request(app).post("/user/signin").send(
            {
                email: "abc@purdue.edu",
                password: "123"
            }
        )
        token = response.body.token;
    });
    
    describe("GET /image/", () => {
        describe("request exsisting image", () => {
            test("Return status: 200", async () => {
                const mock = jest.spyOn(ObjectId, 'isValid')
                    .mockReturnValue(true);
    
                const response = await request(app).get("/image/")
                    .set('Authorization', `Bearer ${token}`)
                    .query({ userID: '123' });
                expect(response.statusCode).toBe(200);
    
                mock.mockRestore();
            })
        })
    
        describe("request images from user that does not exist", () => {
            test("Return status: 200", async () => {
                const response = await request(app).get("/image/")
                    .set('Authorization', `Bearer ${token}`)
                    .query({ userID: '321' });
                expect(response.statusCode).toBe(404);
            })
        })
        afterAll(() => jest.restoreAllMocks());
    })

    describe("POST /image/", () => {
        describe("upload valid image", () => {
            // test("Return status: 200", async () => {
            //     const putObjectMock = jest.fn(() => "s3 upload - placeholder for unit testing.");
            //     const awsMock = jest.spyOn(AWS.S3, 'upload');
            //     awsMock.mockImplementation(() => {
            //       return {
            //         batchGet: async (params, callback) => {
            //             callback(null, putObjectMock(params));  
            //         }
            //       }
            //     });
                

            //     const data = {
            //         userID: 123,
            //         imageLat: 40.580955,
            //         imageLon: -87.095783,
            //         image: new File(["(⌐□_□)"], "testimage.png", { type: "image/png" })
            //     }
    
            //     const response = await request(app).post("/image/")
            //         .set('Authorization', `Bearer ${token}`)
            //         .send(data);

            //     expect(response.statusCode).toBe(200);
    
            // })
        })
    })
})

