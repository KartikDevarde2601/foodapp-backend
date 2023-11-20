const nodemailer = require('nodemailer');

module.exports.sendMail = async function sendMail(str, data) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // use environment variable
      pass: process.env.EMAIL_PASS, // use environment variable
    },
  });

  var Osubject, Ohtml;
  if (str == "signup") {
    Osubject = `Thank you for signing ${data.name}`;
    Ohtml = `
    <h1>Welcome to foodApp.com</h1>
    Hope you have a good time!
    Here are your details-
    Name - ${data.name}
    Email- ${data.email}
    `;
  } else if (str == "resetpassword") {
    Osubject = `Reset Password`;
    Ohtml = `
    <h1>foodAp.com</h1>
    Here is your link to reset your password!
    ${data.resetPasswordLink}
    `;
  }

  try {
    let info = await transporter.sendMail({
      from: '"FoodApp 🍱" <' + process.env.EMAIL_USER + '>', // use environment variable
      to: data.email,
      subject: Osubject,
      html: Ohtml,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error occurred while sending mail:", error);
  }
};
