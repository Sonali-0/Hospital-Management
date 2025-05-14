import { Message } from "../model/massageSchema.js";
import { catchAsycnErrors } from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/error.js";
import { sendMail } from "../utils/sendMail.js";


// Send a message and email the user
export const sendMessage = catchAsycnErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please fill full form", 400));
  }

  await Message.create({ firstName, lastName, email, phone, message });

  await sendMail({
    to: email,
    subject: "Message Received - Jeevan Chaya Hospital Contact Form",
    text: `Dear ${firstName} ${lastName},

Thank you for contacting us. We have received your message and will get back to you soon.

Here is a copy of your message:
"${message}"

Best regards,
Team Jeevan Chaya Medical Center`,
  });

  res.status(200).json({
    success: true,
    message: "Message sent successfully. A confirmation email has been sent to you.",
  });
});

// Get all messages
export const getMessage = catchAsycnErrors(async (req, res, next) => {
  const messages = await Message.find();

  res.status(200).json({
    success: true,
    messages,
  });
});
