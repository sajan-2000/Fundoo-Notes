import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


export async function sendResetPasswordEmail(email, token) {
    const transporter = createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MY_GMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        to: email,
        from: `${process.env.MY_GMAIL}`,
        subject: 'Password Reset',
        text: `reset your password using this token: ${token}`,
        html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:${process.env.APP_PORT}/${token}">click here</a></h1>`
    };

    await transporter.sendMail(mailOptions);
}