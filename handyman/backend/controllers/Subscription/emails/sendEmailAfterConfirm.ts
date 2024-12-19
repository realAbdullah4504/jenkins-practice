export const sendPaymentReceivedEmail = (
  email: string,
  name: string,
  plan: any,
  startDate: string,
  endDate: string
) => {
  return {
    from: "'Handyman' <backenddatabase2023@gmail.com>",
    to: `${email}`,
    subject: `¡Su Suscripción Ahora Está Activa!`,
    html: `
      <html>
      <head>
        <style>
          body {
            max-width: 100%;
            margin-inline: auto;
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            padding: 24px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 24px;
          }
          .header h1 {
            font-size: 24px;
            color: #333333;
          }
          .content {
            color: #555555;
          }
          .content h2 {
            font-size: 20px;
            color: #333333;
            margin-bottom: 8px;
          }
          .content p {
            font-size: 14px;
            margin-bottom: 16px;
          }
          .footer {
            text-align: center;
            margin-top: 24px;
            font-size: 12px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Suscripción Activada</h1>
          </div>
          <div class="content">
            <p>Estimado(a) ${name},</p>
            <p>Nos complace informarle que su pago ha sido recibido con éxito y su suscripción al siguiente plan ha sido activada:</p>
            <h2>Detalles de la Suscripción</h2>
            <p><strong>Nombre del Plan:</strong> ${plan.name}</p>
            <p><strong>Duración:</strong> ${plan.duration_in_months} meses</p>
            <p><strong>Fecha de Inicio:</strong> ${new Date(
              startDate
            ).toLocaleDateString()}</p>
            <p><strong>Fecha de Finalización:</strong> ${new Date(
              endDate
            ).toLocaleDateString()}</p>
            <p>¡Gracias por elegir nuestro servicio! Si tiene alguna pregunta o necesita más asistencia, no dude en ponerse en contacto con nosotros.</p>
            <p>Saludos cordiales,</p>
            <p>El equipo del portal de servicios Handyman</p>
          </div>
          <div class="footer">
            <p>© 2024 Handyman Service Portal. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
    </html>
    `,
  };
};
