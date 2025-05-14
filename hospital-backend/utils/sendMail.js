import nodemailer from "nodemailer";

export const sendMail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",           // SMTP host
    port: 465,                        // 465 for secure, 587 for STARTTLS
    secure: true,                     // true for 465, false for 587
    auth: {
      user: "210106063@hbtu.ac.in",   // Your email
      pass: process.env.EMAIL_PASS,   // App password (not your Gmail password)
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
