import express, { Request, Response, NextFunction } from "express";

export default function localVeriables(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
