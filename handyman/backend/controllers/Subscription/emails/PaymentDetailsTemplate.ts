// mail configuration
export const sendBankDetailsEmail = (
	email: string,
	name: string,
	plan: any,
	paymentId: string
) => {
	const bankName = process.env.NEXT_PUBLIC_BANK_NAME as string;
	const iban = process.env.NEXT_PUBLIC_IBAN as string;
	const swiftCode = process.env.NEXT_PUBLIC_SWIFT_CODE as string;

	return {
		from: "'Handyman'<backenddatabase2023@gmail.com>",
		to: `${email}`,
		subject: `Confirmación de Su Reserva de Suscripción`,
		html: `
      <html>
      <head>
        <style>
          body { max-width: 100%; margin-inline: auto; font-family: Arial, sans-serif; }
          h1 { color: #717171; font-size: 24px; color: #000000; margin-top: 20px; }
          p { font-size: 14px; }
          .container { max-width: 500px; margin: 0 auto; padding-top: 24px; }
          .main { margin-bottom: 20px; color: #000000; }
          .hr__line { height: 1.2px; background-color: #dddddd; margin: 40px auto 30px auto; }
          .desc { color: #000000; padding-bottom: 20px; }
          .desc1 { color: #000; padding: 20px 0 0 0; }
          .desc2 { color: #000; padding: 10px 0; }
          .footer__desc { color: #56595C; padding-bottom: 10px; }
          .footer__img { width: 96px; }
          .mid_p { margin: 0 auto 4px auto; font-size: 13px; }
          .bank-details { padding: 10px; background-color: #f9f9f9; border-radius: 6px; }
          .bank-details p { margin: 4px 0; }
          .button {
            display: inline-block;
            text-decoration: none;
            text-transform: none;
            color: #ffffff;
            font-weight: 600;
            padding: 12px 8px;
            border-radius: 6px;
            background-color: #ff6a18;
          }
          .paymentid{
           color:#C08787
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="main">
            <h1>Instrucciones de Pago</h1>
            <p>Estimado(a) ${name},</p>
          </div>
          <p class="desc">
          ¡Gracias por reservar el paquete de ${
				plan.duration_in_months * 30
			} días en nuestro portal de artesanos! Por favor, transfiera el monto correspondiente a la cuenta proporcionada a continuación, y no olvide incluir el siguiente ID de pago como referencia:</p>
          
      <p class=""><strong>ID de Pago:</strong class='paymentid'> ${paymentId}</p>
      <p class=""><strong>Monto:</strong> $${plan.price}</p>

          <div class="bank-details">
          <h2 style='magin-bottom:5px;font-size:20px'>Detalles Bancarios</h2>
            <p><strong>Nombre del Banco:</strong> ${bankName}</p>
            <p><strong>IBAN:</strong> ${iban}</p>
            <p><strong>BIC/Código SWIFT:</strong> ${swiftCode}</p>
          </div>

          <p class="desc1">Una vez que recibamos su pago, su suscripción se activará automáticamente. Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con nosotros.</p>
          <p class="desc">¡Gracias por su cooperación!</p>

          <div class="hr__line"></div>
          <p class="footer__desc">Saludos cordiales, <br> El equipo del portal de servicios Handyman</p>
        </div>
      </body>
    </html>
    `,
	};
};
