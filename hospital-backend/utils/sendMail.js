import nodemailer from "nodemailer";

export const sendMail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email provider
    auth: {
      user: "210106063@hbtu.ac.in", // your email
      pass: process.env.EMAIL_PASS, // app password or real password (never hardcode)
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
