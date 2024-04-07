import express, { Request, Response } from "express";
import registerModel from "../models/registerModel";
import bcrypt from "bcrypt";

export const resetPassword = async (req: Request, res: Response) => {
  try {
    let payload = req.body;
    let { password, email } = payload;
    // console.log(req.app.locals.resetSession);
    if (req.app.locals.resetSession) {
      const emailExist = await registerModel.findOne({ email: email });
      // console.log(emailExist);
      req.app.locals.resetPassword = false;
      if (emailExist) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        if (await bcrypt.compare(password, emailExist?.password)) {
          return res.status(403).send({
            message: "Previous and current password is same",
            success: false,
          });
        } else {
          let result = await registerModel.updateOne(
            { email: email },
            { password: passwordHash }
          );
          return res.status(200).send({
            message: "Password reset successfully",
            success: true,
            data: result,
          });
        }
      } else {
        return res
          .status(500)
          .send({ message: "Email not Found", success: false });
      }
    } else {
      return res
        .status(404)
        .send({ message: "Session expired", success: false });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "internal server error", success: false });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    // console.log(id);
    if (id) {
      let payload = req.body;
      // console.log(payload);
      let result = await registerModel.updateOne({ _id: id }, payload);

      res.status(200).send({
        message: "User Updated Successfully",
        success: true,
        data: result,
      });
    } else {
      res.status(401).send({
        message: "User not Found",
        success: false,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "internal server error", success: false });
  }
};
