import connectDb from "@/backend/middleware/db";
import userDb from "@/backend/models/userModel";
import { transporter } from "@/helper/mailTransporter";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const payload = req.body;

  if (req.method === "GET") {
  }

  if (req.method == "POST") {
    const { email, oldPassword, newPassword } = req.body;

    console.log(payload, "payload");

    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character" });
    }

    try {
      const findCriteria = {
        email,
      };

      const userDetails = await userDb.findOne(findCriteria);

      const matchPassword = await bcrypt.compare(
        oldPassword,
        userDetails.password
      );

      if (matchPassword) {
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        // saving new password
        await userDb.updateOne(findCriteria, {
          password: newHashedPassword,
        });

        // sending email to user
        let sendMailSailerOption = {
          from: "'Handyman'<backenddatabase2023@gmail.com>",
          to: `${email}`,
          subject: `Your password recently changed!`,
          html: `
                <html>
                <head>
                  <style>
                    body { max-width: 100%; margin-inline: auto; } h1 { color: #717171;
                    font-size: 24px; color: #000000; margin-top: 20px;} p { font-size: 14px;}
                    .container { max-width: 500px; margin: 0 auto; padding-top: 24px; } .main
                    {margin-bottom: 20px; color: #000000;} .hr__line{ height: 1.2px;
                    background-color: #dddddd; margin: 40px auto 30px auto; } .desc { color:
                    #000000; padding-bottom: 20px;} .desc1 {color: #000; padding:20px 0 0 0} .desc2{color:#000; padding: 10px 0} .footer__desc { color: #56595C;
                    padding-bottom: 10px;} .footer__img{ width: 96px; } .mid_p { margin: 0
                    auto 4px auto; font-size: 13px; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="main">
                      <h1>Your password get reset.</p>
                    </div>
                    <p class="desc">Thank you for choosing Handyman.</p>
                    <p class="desc">This email is send because your password changed now.</p>

                    <p class="desc1">Your login credentials:</p>

                    <p class="desc2">Email: ${email}</p>
                    <p class="desc2">Password: ${newPassword}</p>
              
                    <div class="hr__line"></div>
                    <p class="footer__desc">Our service team is at your disposal if you have any questions! </br> You can call us Monday to Friday from 8 a.m to 5 p.m. </br> +49 123 456789 </br> Best regards, </br> Handyman Team</p>
                </body>
              </html>
                      `,
        };
        const responseSailerMail = await transporter.sendMail(
          sendMailSailerOption
        );

        return res
          .status(200)
          .json({ message: "Contraseña actualizada correctamente" });
      } else {
        return res
          .status(401)
          .json({ message: "¡No autorizado!La contraseña no coincidió" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(500).json({ message: "Invalid request method" });
  }
};

export default connectDb(handler);
