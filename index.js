const express = require("express")
const app = express()
require("dotenv").config()

const bodyParser = require("body-parser")
const cors = require("cors")
const nodemailer = require("nodemailer")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user:  process.env.MAIL_USER, // generated ethereal user
      pass:  process.env.MAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Siyabonga Gregory 👻" <huge.fuze@gmail.com>', // sender address
    to: "huge.fuze@gmail.com", // list of receivers
    subject: "Testing Email Template ✔", // Subject line
    text: "Email Template", // plain text body
    html:""// plain html content
  });

  console.log("Message sent: %s", info.messageId);

}

main().catch(console.error);
