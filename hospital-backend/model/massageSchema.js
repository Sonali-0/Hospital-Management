import mongoose from "mongoose";
import validator from "validator";


const massageSchema = new mongoose.Schema({
    firstName :{
        type : String,
        require : true,
        minLength : [3, "First name must contain at least 3 character"]
    },

    lastName :{
        type : String,
        require : true,
        minLength : [3, "Lirst name must contain at least 3 character"]
    },

    email :{
        type : String,
        require : true,
        validate: [validator.isEmail, "Please provide a valid email"],
},
    phone :{
    type : String,
    require : true,
    minLength : [10, "Phomne Number must contain 10 character"],
    maxLength : [10, "Phomne Number must contain 10 character"],
},
 message :{
    type : String,
    require : true,
    minLength : [10, "Message must contain at least 3 character"]
},

});

export const Message = mongoose.model("Message", massageSchema);