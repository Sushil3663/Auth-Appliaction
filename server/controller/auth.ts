import express, { Request, Response } from "express";
import registerModel from "../models/registerModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SendMail } from "./SendMail";
const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data = null,
  success = true
) => {
  res.status(statusCode).json({
    message,
    success,
    data,
  });
};
export const Register = async (req: Request, res: Response) => {
  try {
    let payload = req.body;
    const { email, username, password, profile } = payload;
    // console.log(email);
    const emailExist = await registerModel.findOne({ email });

    if (emailExist) {
      return res
        .status(409)
        .send({ message: "Email already Exist", success: false });
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      let data = new registerModel({
        email,
        username,
        password: passwordHash,
        profile: profile || "",
      });

      let result = await data.save();
      let subject = "Register Successfully";
      let text =
        "Hello your account has be created successfully. Please feel free to use Application.";
      SendMail({ email, username, subject, text });

      sendResponse(res, 200, "Register successful", result);
      //   return res
      //     .status(200)
      //     .send({ message: "Register successful", success: true, data: result });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: "internal server error", success: false });
    console.error(err);
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    let payload = req.body;
    let { email, password } = payload;
    // console.log(email, password);
    // let emailExist = await registerModel.findOne({ email: email });
    // if (emailExist) {
    //   bcrypt.compare(
    //     req.body.password,
    //     emailExist.password,
    //     function (err, result) {
    //       if (password != emailExist.password) {
    //         return res
    //           .status(400)
    //           .send({ message: "Password doesnot match", success: false });
    //       } else {
    //         //jwt implementation
    //         const token = jwt.sign(
    //           { id: emailExist._id },
    //           process.env.Token_Key as string,
    //           {
    //             expiresIn: "30d",
    //           }
    //         );
    //         return res.status(200).send({
    //           message: "Successfully Login",
    //           success: true,
    //           data: { token, emailExist },
    //         });
    //       }
    //     }
    //   );
    // } else {
    //   return res
    //     .status(404)
    //     .send({ message: "Email not found", success: false });
    // }
    registerModel
      .findOne({ email: email })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((checkPassword) => {
            if (!checkPassword)
              return res.status(500).send({ error: "Don't have a password" });

            //jwt implementation
            const token = jwt.sign(
              { id: user._id },
              process.env.Token_Key as string,
              {
                expiresIn: "30d",
              }
            );
            const userWithToken = { ...user.toObject(), token };
            return res.status(200).send({
              message: "Successfully Login",
              success: true,
              data: userWithToken,
            });
          })
          .catch((err) => {
            return res
              .status(400)
              .send({ message: "Password doesnot match", success: false });
          });
      })
      .catch((err) => {
        return res
          .status(404)
          .send({ message: "Email not found", success: false });
      });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "internal server error", success: false });
  }
};
