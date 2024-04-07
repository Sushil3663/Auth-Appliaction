import express, { Request, Response } from "express";

// successfully redirect user when otp is valid
export const ResetSession = (req: Request, res: Response) => {
  try {
    if (req.app.locals.resetSession) {
      req.app.locals.resetSession = false;
      res.status(200).send({ message: "Access Granted", success: true });
    } else {
      res.status(403).send({ message: "session expired", success: false });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "internal server error", success: false });
  }
};
