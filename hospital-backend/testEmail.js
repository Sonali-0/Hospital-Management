import { sendMail } from "./utils/sendMail.js";
import { config } from "dotenv";
config({ path: "./config/config.env" });

sendMail({
  to: "your_personal_email@gmail.com", // Use any valid email
  subject: "SMTP Test - Hospital App",
  text: "If you received this, SMTP is working properly.",
}).then(() => {
  console.log("Test email sent successfully.");
}).catch((error) => {
  console.error("Email sending failed:", error);
});
