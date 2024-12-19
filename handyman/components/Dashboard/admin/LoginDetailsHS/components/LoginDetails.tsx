import React from "react";
import Table from "../../components/Table";
const TestData = [
  {
    id: 1,
    IP_Address: "103.76.96.0",
    Login_Date: "26/05/2023",
    Login_Time: "6:00 PM",
  },
];
export default function LoginDetails() {
  return (
    <div className="w-full">
      <div className="lg:w-3/4 lg:mx-auto">
      <h1 className="text-xl font-bold mb-7">Detalles de inicio de sesión</h1>
        <div className="flex justify-center items-center bg-[#F0EAEA] py-3 px-10 rounded-t-md">
          <span className="font-bold w-[30rem]">Dirección IP</span>
          <span className="font-bold w-[30rem]">Fecha de inicio de sesión</span>
          <span className="font-bold w-[6rem]">Tiempo de inicio de sesión</span>
        </div>
        {TestData.map((item) => (
          <Table key={item.id} col1={item.IP_Address} col2={item.Login_Date} col3={item.Login_Time} width={6}/>
        ))}
      </div>
    </div>
  );
}
