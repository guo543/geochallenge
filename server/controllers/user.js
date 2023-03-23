import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';

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
        // console.log('test after')

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
        const result = await User.create({ email, password: hashedPassword, profilePicture: "" });
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

    console.log("Before User: " + user);
    
    user.profilePicture = profilePicture;
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

    console.log("Updated User: " + updatedUser)

    res.json(updatedUser);
}

export const getScoreRecords = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser)
            return res.status(404).json({ message: "User doesn't exist." });

        //TODO: Have some query that gets all score record data for the user with the given email
        console.log(existingUser);

        res.status(200).json({ result: existingUser });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};