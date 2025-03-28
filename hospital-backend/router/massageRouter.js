import express from "express";

import {sendMessage} from "../controller/messageController.js"
import { getMessage } from "../controller/messageController.js";
import { isAdminAuthenticated } from "../Middlewares/auth.js";

const router = express.Router();
router.post("/send", sendMessage);
router.get("/getall", getMessage ,isAdminAuthenticated, )


export default router;
