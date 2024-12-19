import React from "react";

export default function ActivationSettingHS() {
  return (
    <div className="px-7 py-5 w-full md:w-3/4 mx-auto">
      <div className="flex justify-between items-center flex-wrap gap-5">
        <div className="space-y-4">
          <section>
            <h1 className="text-2xl font-bold">Verificar cuenta</h1>
            <p className="text-gray-500">Verificar la cuenta</p>
          </section>
          <button className="bg-orange px-5 py-2 text-white rounded-md">
            Verificar cuenta
          </button>
        </div>
        <div className="space-y-4">
          <section>
            <h1 className="text-2xl font-bold">Activar cuenta</h1>
            <p className="text-gray-500">Activar la cuenta</p>
          </section>
          <button className="bg-orange px-5 py-2 text-white rounded-md">
            Activar cuenta
          </button>
        </div>
        <div className="space-y-4">
          <section>
            <h1 className="text-2xl font-bold">Desactivar cuenta</h1>
            <p className="text-gray-500">Desactivar la cuenta</p>
          </section>
          <button className="bg-orange px-5 py-2 text-white rounded-md">
            Desactivar cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
