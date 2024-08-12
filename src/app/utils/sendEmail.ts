import nodemailer from "nodemailer";
import config from "../config";

type TSendEmail = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export const sendEmail = async ({ to, subject, text, html }: TSendEmail) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com.",
    port: 587,
    secure: config.node_env === "production",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: config.email_host_user,
      pass: config.email_host_pass,
    },
  });

  await transporter.sendMail({
    from: config.email_host_user, // sender address
    to, // list of receivers
    subject: subject, // Subject line - "Reset your password within ten mins!"
    text, // plain text body
    html, // html body
  });
};
