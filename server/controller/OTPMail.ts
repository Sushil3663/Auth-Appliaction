import { Request, Response } from "express";
import nodemailer from "nodemailer";
import mailGen from "mailgen";
import dotenv from "dotenv";

dotenv.config();

export const OTPMail = async (req: Request, res: Response) => {
  try {
    let { username, email, text, subject } = req.body;
    // console.log(email);
    var userEmail = {
      body: {
        name: username,
        intro: text || "Welcome",
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    var mailGenerator = new mailGen({
      theme: "default",
      product: {
        name: "noreply",
        link: "https://mailgen.js/",
        logo: "Logo",
      },
    });

    // Generate an HTML email with the provided contents
    var emailBody = mailGenerator.generate(userEmail);

    var mailOptions = {
      from: "no-reply@example.com",
      to: email,
      subject: subject || "SignUp Successfully",
      html: emailBody,
    };

    // Nodemailer configuration using Ethereal
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   auth: {
    //     user: "olin.rippin@ethereal.email",
    //     pass: "fKpfFXsAT2GPmFfpeU",
    //   },
    // });

    // console.log(email);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      // logger: true,
      // debug: true,
      // secureConnection: false,
      auth: {
        user: "karkisushil309@gmail.com",
        pass: "xgtw icrf sbge ozfg",
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    // await transporter.sendMail(mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error in sending email  " + error);
        return true;
      } else {
        console.log("Email sent: " + info.response);
        return res
          .status(200)
          .send({ message: "You have receive a mail from us", success: true });
      }
    });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .send({ message: "internal server error", success: false });
  }
};
