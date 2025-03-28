import {Message} from "../model/massageSchema.js"
import { catchAsycnErrors } from "../Middlewares/catchAsyncError.js";
import  ErrorHandler from "../Middlewares/error.js";

export const sendMessage = catchAsycnErrors(async (req, res, next)=>{
    const {firstName, lastName, email, phone, message} = req.body;

    if(!firstName || !lastName || !email || !phone || !message){
        return  next(new ErrorHandler("Plese fill Full from" , 400));
        //   res.status(400).json({
        //    success : false,
        //    message : "Please Fill Full Form" ,
       // });
    }
       await Message.create({firstName, lastName, email, phone, message})
       res.status(200).json({
         success : true,
         message: "Message Send Successfully",
       });
})

export const getMessage = catchAsycnErrors(async (req, res, next) => {
  const messages = await Message.find(); // Fetch all messages

  res.status(200).json({
    success: true,
    messages, // Return all messages
  });
});


