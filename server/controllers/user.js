import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import AWS from 'aws-sdk';
import multer from 'multer';

import User from "../models/user.js";

import nodemailer from "nodemailer";
const verificationMap = new Map();

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );


        if (!isPasswordCorrect)
            return res.status(404).json({ message: "Invalid credentials." });

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            "test",
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const signup = async (req, res) => {
    const { email, password } = req.body;
    //console.log(password);

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser)
            return res.status(400).json({ message: "User already exist." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, profilePicture: "", recordCount: 0, averageScore: -1 });
        console.log('test after')

        const token = jwt.sign({ email: result.email, id: result._id }, "test", {
            expiresIn: "1h",
        });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
    //res.json("signup");
};

export const verification = async (req, res) => {
    try {
        const email = req.body.email;
        if (req.body.email == false) {
            res.json(false);
            return;
        } else {
            var val = Math.floor(1000 + Math.random() * 9000);
            verificationMap.set(req.body.email, val);
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "boilercard1@gmail.com",
                    pass: "hwgprezcxqzkxexk",
                },
            });
            const mailOptions = {
                from: "boilercard1@gmail.com",
                to: email,
                subject: "Verification code",
                text:
                    "Your code for recover password is: " +
                    val +
                    ", Do not send it to anyone.",
            };
            transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: code is " + val);
                }
            });
            res.status(200).json({ message: "Verification code sent." });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};
export const checkcode = async (req, res) => {
    const email = req.body.email;
    const code = req.body.code;
    const realcode = verificationMap.get(email);
    if (code == realcode) {
        res.status(200).json({ message: "Code is matched." });
    } else {
        res.status(400).json({ message: "Code is not matched." });
    }
};
export const resetpassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const changeProfilePicture = async (req, res) => {
    const { id } = req.params;

    const { profilePicture } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');

    const user = await User.findById(id);

    //console.log("Before User: " + user);
    
    user.profilePicture = profilePicture;
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

    //console.log("Updated User: " + updatedUser)

    res.json(updatedUser);
}

export const updateScoreRecords = async (req, res) => {
    const { id } = req.params;

    const { score } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');

    //get the user
    const user = await User.findById(id);

    console.log("Before User: " + user);

    //amount of score records that you want to keep track of
    let maxRecords = 10;

    //update score records
    if (user.recordCount < maxRecords) {
        //array is less than the max elements, so add another entry
        user.records.push(score);
    } else {
        //replace the score of the oldest entry in the array with the most recent score
        user.records[user.recordCount % maxRecords] = score;
    }
    user.recordCount++;

    //update user's average score
    if (user.averageScore == -1) {
        //if this is the first guess made, the score will be the average
        user.averageScore = score;
    } else {
        //update the average with the new score accounted for
        user.averageScore = ((user.recordCount - 1) / user.recordCount) * user.averageScore + (1 / user.recordCount) * score;
    }

    //save changes
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

    console.log("Updated User: " + updatedUser)

    res.json(updatedUser);
}

export const getScoreRecords = async (req, res) => {
    const { email } = req.query;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser || existingUser.email !== email)
            return res.status(404).json({ message: "User doesn't exist." });

        //TODO: Have some query that gets all score record data for the user with the given email
        console.log(existingUser);

        res.status(200).json({ result: existingUser });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const uploadProfilePicture = async (req, res) => {
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-2'
    });
    const upload = multer();
    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: 'Error uploading image' });
        }
        
        if (req.file === undefined) {
            return res.status(400).json({ message: 'No image provided' });
        }
        
        const file = req.file;
        const { userID } = req.body;
        const key = `${userID}/${Date.now()}-${file.originalname}`;
        const bucketName = 'useruploadedprofilepictures';
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype
        };

        s3.upload(params, async (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error uploading image to S3: ' + err.name });
            } else {
                return res.status(200).json({ message: 'Image uploaded successfully to S3', image: data.Location });
            }
        });
    });
};