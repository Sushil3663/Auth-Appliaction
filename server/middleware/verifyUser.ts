import express, { Request, Response, NextFunction } from "express";
import registerModel from "../models/registerModel";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let payload = req.method === "POST" ? req.body : req.params;
    let { email } = payload;

    let emailExist = await registerModel.findOne({ email });
    if (!emailExist) {
      return res
        .status(404)
        .send({ error: "Can not find Email", success: false });
    } else {
      return next();
    }
  } catch (error) {
    return res.status(404).send({ error: "Error authenticating" });
  }
};
export default verifyUser;
