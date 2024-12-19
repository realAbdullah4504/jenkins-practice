import React from "react";

interface BankDetails {
  bankName: string;
  iban: string;
  swiftCode: string;
}

interface PlanDetails {
  duration_in_months: number;
  price: number;
}

interface BankDetailsEmailProps {
  name: string;
  plan: PlanDetails;
  paymentId: string;
}

const BankDetailsEmail: React.FC<BankDetailsEmailProps> = ({
  name,
  plan,
  paymentId,
}) => {
  return (
    <div className="max-w-full mx-auto font-sans">
      <div className="max-w-lg mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-xl font-bold mb-2">Instrucciones de Pago</h1>
        </div>
        <p className="mb-2">Estimado/a {name},</p>
        <p className="mb-4">
          ¡Gracias por reservar el Paquete de {plan?.duration_in_months * 30}{" "}
          Días en nuestro portal de artesanos! Por favor, transfiera el monto
          correspondiente a la cuenta proporcionada a continuación, y no olvide
          incluir el siguiente ID de Pago como referencia:
        </p>
        <p className="mb-2">
          <strong>ID de Pago:</strong>{" "}
          <span className="text-red-400"> {paymentId}</span>
        </p>
        <p className="mb-4">
          <strong>Monto:</strong> ${plan?.price}
        </p>
        <div className="p-2 bg-gray-100 rounded-lg mb-4">
          <h2 className="font-bold mb-2">Detalles Bancarios</h2>
          <p className="mb-2">
            <span className="font-semibold">Nombre del Banco:</span>{" "}
            {process.env.NEXT_PUBLIC_BANK_NAME}
          </p>
          <p className="mb-2">
            <span className="font-semibold">IBAN:</span>{" "}
            {process.env.NEXT_PUBLIC_IBAN}
          </p>
          <p className="">
            <span className="font-semibold">Código BIC/SWIFT:</span>{" "}
            {process.env.NEXT_PUBLIC_SWIFT_CODE}
          </p>
        </div>
        <p className="mb-2">
          Una vez que recibamos su pago, su suscripción se activará
          automáticamente. Si tiene alguna pregunta o necesita asistencia, no
          dude en contactarnos.
        </p>

        <p className="mb-4">¡Gracias por su cooperación!</p>
        <hr className="border-t border-gray-300 mb-4" />
        <p className="">
          Atentamente,
          <br />
          Equipo del Portal de Servicios de Handyman
        </p>
      </div>
    </div>
  );
};

export default BankDetailsEmail;
