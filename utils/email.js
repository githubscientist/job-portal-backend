const nodemailer = require('nodemailer');
const { GOOGLE_USER_EMAIL, GOOGLE_APP_PASSWORD } = require('./config');

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: GOOGLE_USER_EMAIL,
        pass: GOOGLE_APP_PASSWORD,
    },
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: GOOGLE_USER_EMAIL,
        to,
        subject,
        text,
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
}

module.exports = sendEmail;