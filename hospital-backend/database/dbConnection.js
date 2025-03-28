import mongoose from "mongoose";

export const dbConnection =()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName : "Hospital_management"
    }).then(()=>{
        console.log("connected to database");
     })
     .catch((err)=>{
        console.log(`some error occured while connecting to database : ${err}`);
     });
};