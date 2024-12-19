import moment from "moment";
import React from "react";
import StatusButton from "./StatusButton";
import { FaEdit, FaTrash } from "react-icons/fa";
interface OrderItem {
  title: string;
  paragraph: string;
  price: string;
  postedOn: {
    date: string;
    time: string;
    day: string;
  };
  isNew: boolean;
  status: string;
}
export default function Orders({
  title,
  paragraph,
  price,
  postedOn,
  isNew,
  status,
}: OrderItem) {
  const { date, time } = postedOn;
  return (
    <div className="w-full py-5 px-3">
      <section className="w-full  flex justify-between items-start">
        <div className="ext-xl font-semibold flex flex-col">
          <h1 className="text-xl font-semibold flex flex-row gap-3 items-end text-orange">
            {"Demolition and Disposal"}
          </h1>
          <span className="text-lg font-medium	">
            Demolición completa de edificios y estructuras
          </span>

          <span className="font-normal">Sq: 5 pies</span>
          <span className="font-normal">Alojamiento: 5 </span>
          <span className="font-normal">Pisos: 5 </span>
          <span className="font-bold">Descripción</span>
        </div>

        <StatusButton status={status} />
      </section>
      <section className="my-3">
        Demolición y eliminación Demolición completa de edificios y estructuras
        Lorem ipsum es simplemente un texto ficticio de la impresión y la
        tipografía industria.Lorem ipsum ha sido la industria&apos;S texto
        ficticio estándar.
        <span className="text-xl  font-bold inline-block my-3 float-right">
          {price}
        </span>
      </section>
    </div>
  );
}
