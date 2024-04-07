import express, { Request, Response } from "express";
import registerModel from "../models/registerModel";

const GetUser = async (req: Request, res: Response) => {
  try {
    let { email } = req.params;
    console.log(email);
    if (!email) {
      return res.status(501).send({ message: "Invalid Email", success: false });
    } else {
      const result = await registerModel.findOne({ email: email });

      return res
        .status(200)
        .json({ message: "Successfull Get User", success: true, data: result });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "internal server error", success: false });
  }
};

export default GetUser;
