import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import nodemailer from 'nodemailer';
const verificationMap = new Map();

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(404).json({ message: "Invalid credentials." });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." })
    }
}

export const signup = async (req, res) => {
    const { email, password } = req.body;
    //console.log(password);

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exist." });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword });
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." })
    }
}

export const verification = async() =>{
    console.log(req.body.email);
  if (req.body.email == false) {
    res.json(false);
    return;
  } else {
    var val = Math.floor(1000 + Math.random() * 9000);
    verificationMap.set(req.body.email,val)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "boilercard1@gmail.com",
        pass: "hwgprezcxqzkxexk",
      },
    });
    const mailOptions = {
      from: "boilercard1@gmail.com",
      to: user.email,
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
        console.log("Email sent: " + info.response);
      }
    });
    res.json("send email")
  }
}