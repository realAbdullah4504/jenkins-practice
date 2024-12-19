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
export default function HandymanProfile({search,setSearch}: {search: string;setSearch: React.Dispatch<React.SetStateAction<string>>;}) {
  return (
    <div className="w-full space-y-10">
      <div className="flex w-1/2   mx-auto rounded-md">
        <input type="text" className="grow px-3 py-1  rounded-l-md outline-none" placeholder="search by email, company name or Listing ID:" name="search_service" title="Search our services" value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button className="py-3 px-4 bg-white text-black border-l-2 rounded-r-md">
          Encontrar servicio
        </button>
      </div>
      <div>
        <div className="lg:w-3/4 lg:mx-auto">
          <div className="flex justify-center items-center bg-[#F0EAEA] py-3 px-10 rounded-t-md">
            <span className="font-bold w-[30rem]">DIRECCIÓN</span>
            <span className="font-bold w-[30rem]">DIRECCIÓN</span>
            <span className="font-bold w-[9rem]">Dirección de correo electrónico</span>
          </div>
          {TestData.map((item) => (
            <Table key={item.id} col1={item.IP_Address} col2={item.Login_Date} col3={item.Login_Time} width={9}/>
          ))}
        </div>
        <div className="lg:w-3/4 lg:mx-auto">
          <div className="flex justify-center items-center bg-[#F0EAEA] py-3 px-10">
            <span className="font-bold w-[30rem]">Apellido</span>
            <span className="font-bold w-[30rem]">Apellido</span>
            <span className="font-bold w-[9rem] border-2">nombre de empresa</span>
          </div>
          {TestData.map((item) => (
            <Table key={item.id} col1={item.IP_Address} col2={item.Login_Date} col3={item.Login_Time} width={9}/>
          ))}
        </div>
      </div>
    </div>
  );
}
