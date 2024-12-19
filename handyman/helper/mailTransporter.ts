import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "backenddatabase2023@gmail.com",
    pass: "hmbc nnpv mlvg bfvs",
  },
});
