import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const VerifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.header("Authorization");
    if (token) {
      if (token.startsWith("Bearer ")) {
        // token = token.substring(0, token.length).trimStart();
        token = token.split(" ")[1];

        // console.log("token");
        jwt.verify(token, process.env.Token_Key as any);
      }
      return next();
    } else {
      return res
        .status(401)
        .send({ error: "A token is required for authentication" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Error authenticating" });
  }
};
export default VerifyToken;
