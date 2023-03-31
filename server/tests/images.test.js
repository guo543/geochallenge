// import supertest from 'supertest'
import app from '../index.js'
import request from 'supertest'
import {jest} from '@jest/globals'
import Image from "../models/image.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { ObjectId } from 'mongodb'
import path from 'path'

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
        describe("request existing image", () => {
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

    describe("POST /image/ : intentionally fail with code 500 (InvalidAccessKeyId) to avoid accessing S3 buckets and timing out", () => {
        const OLD_ENV = process.env;

        beforeAll(() => {
            // fail aws APIs intentionally to avoid time out
            process.env.AWS_ACCESS_KEY_ID = 'fake';
            process.env.AWS_SECRET_ACCESS_KEY = 'fake';
        });

        afterAll(() => {
            jest.restoreAllMocks()
            process.env = OLD_ENV;
        });

        describe("upload valid image", () => {
            test("Return status: 500 (InvalidAccessKeyId)", async () => {

                const response = await request(app)
                    .post("/image/")
                    .set('Authorization', `Bearer ${token}`)
                    .set('Content-Type', 'multipart/form-data')
                    .field('userID', '123')
                    .field('imageLat', 40.580955)
                    .field('imageLon', -87.095783)
                    .attach('image', path.join(__dirname, './testImage.jpeg'));
                
                expect(response.statusCode).toBe(500);
                expect(response.body.message).toBe('Error uploading image to S3: InvalidAccessKeyId');
            })
        })

        describe("upload invalid image (coordinates out of bound)", () => {
            test("Return status: 500 (InvalidAccessKeyId)", async () => {

                const response = await request(app)
                    .post("/image/")
                    .set('Authorization', `Bearer ${token}`)
                    .set('Content-Type', 'multipart/form-data')
                    .field('userID', '123')
                    .field('imageLat', 123123.580955)
                    .field('imageLon', -87.095783)
                    .attach('image', path.join(__dirname, './testImage.jpeg'));
                
                expect(response.statusCode).toBe(500);
                expect(response.body.message).toBe('Error uploading image to S3: InvalidAccessKeyId');
            })
        })

        describe("upload no image", () => {
            test("Return status: 400 (No image provided)", async () => {

                const response = await request(app)
                    .post("/image/")
                    .set('Authorization', `Bearer ${token}`)
                    .set('Content-Type', 'multipart/form-data')
                    .field('userID', '123')
                    .field('imageLat', 123123.580955)
                    .field('imageLon', -87.095783);
                
                expect(response.statusCode).toBe(400);
                expect(response.body.message).toBe('No image provided');
            })
        })
    })

    describe("POST /user/uploadprofilepicture : intentionally fail with code 500 (InvalidAccessKeyId) to avoid accessing S3 buckets and timing out", () => {
        const OLD_ENV = process.env;

        beforeAll(() => {
            // fail aws APIs intentionally to avoid time out
            process.env.AWS_ACCESS_KEY_ID = 'fake';
            process.env.AWS_SECRET_ACCESS_KEY = 'fake';
        });

        afterAll(() => {
            jest.restoreAllMocks()
            process.env = OLD_ENV;
        });

        describe("upload valid image", () => {
            test("Return status: 500 (InvalidAccessKeyId)", async () => {

                const response = await request(app)
                    .post("/user/uploadprofilepicture")
                    .set('Authorization', `Bearer ${token}`)
                    .set('Content-Type', 'multipart/form-data')
                    .field('userID', '123')
                    .field('imageLat', 40.580955)
                    .field('imageLon', -87.095783)
                    .attach('image', path.join(__dirname, './testImage.jpeg'));
                
                expect(response.statusCode).toBe(500);
                expect(response.body.message).toBe('Error uploading image to S3: InvalidAccessKeyId');
            })
        })

        describe("upload no image", () => {
            test("Return status: 400 (No image provided)", async () => {

                const response = await request(app)
                    .post("/user/uploadprofilepicture")
                    .set('Authorization', `Bearer ${token}`)
                    .set('Content-Type', 'multipart/form-data')
                    .field('userID', '123')
                    .field('imageLat', 123123.580955)
                    .field('imageLon', -87.095783);
                
                expect(response.statusCode).toBe(400);
                expect(response.body.message).toBe('No image provided');
            })
        })
    })
        

    describe("GET /image/rand/", () => {
        describe("request random image", () => {
            test("Return status: 200", async () => {
                jest.spyOn(Image, 'aggregate')
                    .mockImplementation(() => Promise.resolve( mockImage ));
                const response = await request(app).get("/image/rand/")

                expect(response.statusCode).toBe(200);
                expect(response.body.image).toStrictEqual(mockImage);
            })
        })
        afterAll(() => jest.restoreAllMocks());
    })
})

