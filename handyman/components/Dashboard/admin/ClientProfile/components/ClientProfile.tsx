import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaCheckCircle, FaSearch } from "react-icons/fa";
import LoginDetails from "./LoginDetails";
import UserList from "./UserList";

export default function ClientProfile({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const queryClient = useQueryClient();
  return (
    <div className="w-full">
      <div className="lg:w-3/4 lg:mx-auto">
        <section className="my-8">
          <h1 className="font-bold text-4xl text-Heading text-center">
            Centro de gestión de usuarios:
            <span className="text-orange font-bold">
              Centro de control del administrador
            </span>
          </h1>
        </section>
        <div className="flex w-5/5 p-4 justify-center relative">
          <span
            style={{ left: "2%" }}
            className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaSearch className="text-gray-400" />
          </span>
          <input
            style={{ height: 56 }}
            type="text"
            placeholder="Buscar por correo electrónico, nombre de la empresa y rol:"
            className="pl-10 w-4/5 pr-4 py-2 border rounded-l-2xl focus:outline-none focus:ring "
            onChange={async(e) => {
              setSearch(e.target.value);
              await queryClient.invalidateQueries({ queryKey: ['getUsers'] });
            }}
            value={search}
          />
          <button
            className="w-1/5 bg-white px-4 py-2 border rounded-r-2xl focus:outline-none focus:ring text-[#0E172C]">
            Buscar Perfil
          </button>
        </div>
      </div>
      
      <UserList search={search} />
      <LoginDetails />
    </div>
  );
}

export const getStatusBadge = (status: any) => {
  return status ? (
    <FaCheckCircle className="m-auto" color={"#66bd0f"} />
  ) : (
    <FaCheckCircle className="m-auto" color={"#ed4d19"} />
  );
};

export const Search = () => {
  return (
    <>
      <span className="w-[25rem]">Dirección</span>
      <span className="w-[25rem]">0156241893525</span>
      <span className="w-[7rem]">xyz@gnail.com</span>
    </>
  );
};
