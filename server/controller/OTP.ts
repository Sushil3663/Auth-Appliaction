import express, { Request, Response } from "express";
import otpGenerator from "otp-generator";
import { SendMail } from "./SendMail";
export const generateOTP = async (req: Request, res: Response) => {
  try {
    let OTP = await otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    // console.log(OTP);
    req.app.locals.OTP = OTP;
    res
      .status(200)
      .send({ message: "OTP Generated Successful", success: true, data: OTP });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "internal server error", success: false });
  }
};

export const verifyOTP = (req: Request, res: Response) => {
  try {
    let { data } = req.query as { data: string };
    // console.log(data);
    // console.log(req.app.locals.OTP);

    if (data == req.app.locals.OTP) {
      // console.log(req.app.locals.OTP);
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      res
        .status(200)
        .send({ message: "OTP verification successful", success: true });
    } else {
      res.status(200).send({ message: "Invalid OTP", success: false });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "internal server error", success: false });
  }
};
