export const sendChangePassMail = (
	user: any,
	baseUrl: string = process.env.BASE_URL as string
) => ({
	from: "'Handyman'<backenddatabase2023@gmail.com>",
	to: `${user.email}`,
	subject: `Confirmación: Cambio de Contraseña Exitoso`,
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
                  <p>Estimado/a ${user.name}</p>
                </div>
                <p class="desc">Tu contraseña ha sido cambiada con éxito. Por favor, confirma este cambio haciendo clic en el siguiente enlace:</p>
            
                <a
                  href="${baseUrl}/dashboard/${user.role}"
                  style="text-decoration: none; text-transform: none; color: rgb(255, 255, 255); font-weight: 600; padding: 12px 8px; border-radius: 6px; background-color: rgba(255, 106, 24, 1);;"
                >Ir al Panel de Control</a>

                <p class="desc1">Si tienes alguna pregunta o necesitas asistencia, estamos aquí para ayudar.</p>
                </br>

                <div class="hr__line"></div>
                <p class="footer__desc">Saludos cordiales, <br> El equipo del portal de servicios Handyman</p>
            </body>
          </html>
                  `,
});
