import nodemailer from 'nodemailer'
const verificationMap = new Map();
export const signin = async (req, res) => {
    res.send("signin");
}

export const signup = async (req, res) => {
    res.send("signup");
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