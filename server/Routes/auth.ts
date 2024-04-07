import express from "express";
import { Login, Register } from "../controller/auth";
import { SendMail } from "../controller/SendMail";
import { generateOTP, verifyOTP } from "../controller/OTP";
import { resetPassword, updateUser } from "../controller/update";
import { ResetSession } from "../controller/ResetSession";
import verifyUser from "../middleware/verifyUser";
import GetUser from "../controller/GetUser";
import VerifyToken from "../middleware/verifyToken";
import localVeriables from "../middleware/local";
import { OTPMail } from "../controller/OTPMail";

let router = express.Router();

//post
router.post("/register", Register);

router.route("/login").post(verifyUser, Login);

router.route("/sendmail").post(OTPMail);

//Get
router.get("/generateOTP", localVeriables, generateOTP);
router.get("/verifyOTP", verifyOTP);
router.route("/user/:email").get(VerifyToken, GetUser);
router
  .route("/createResetSession")
  .get(VerifyToken, localVeriables, ResetSession);

//put
router.put("/resetPassword", resetPassword);
router.route("/updateuser").put(VerifyToken, updateUser);

export default router;
