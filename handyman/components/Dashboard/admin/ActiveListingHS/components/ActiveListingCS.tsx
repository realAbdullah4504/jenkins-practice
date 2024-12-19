import React from "react";
import Table from "../../components/Table";

const TestData = [
  {
    id: 1,
    Job_Title:
      "Complete demolition of buildings and structures",
    Listing_ID: "32918465",
    Date_of_Post: "23/05/2023",
  },
];
export default function ActiveListingCS() {
  return (
    <div className="w-full">
      <div className="lg:w-3/4 lg:mx-auto">
        <h1 className="text-xl font-bold mb-7">Listado activo</h1>
        <div className="flex justify-between items-center bg-[#F0EAEA] py-3 px-10 rounded-t-md">
          <span className="font-bold w-[30rem]">Título profesional</span>
          <span className="font-bold w-[30rem]">Listado ID:</span>
          <span className="font-bold w-[6rem] whitespace-nowrap">Fecha de publicación</span>
        </div>
        {TestData.map((item) => (
          <Table key={item.id} col1={item.Job_Title} col2={item.Listing_ID} col3={item.Listing_ID} width={6}/>
        ))}
      </div>
    </div>
  );
}
