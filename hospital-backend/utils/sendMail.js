import nodemailer from "nodemailer";
import { config } from "dotenv";

config({ path: "./config/config.env" }); // Load .env file

export const sendMail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "210106063@hbtu.ac.in",
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "210106063@hbtu.ac.in",
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};


