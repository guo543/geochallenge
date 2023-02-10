import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user.js'
import nodemailer from 'nodemailer'
const app = express();
const verificationMap = new Map();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/user', userRoutes);

app.get('/hello', (req, res) => {
    res.send("hello");
});
app.get("/verification", async function (req, res) {
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
  }
});

let PORT = process.env.PORT || 8000;;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))