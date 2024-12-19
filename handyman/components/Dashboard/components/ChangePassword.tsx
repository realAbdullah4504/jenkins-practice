import React from "react";
import { EmailErroType, EmailType } from '../client/ChangePassword/index';

export default function ChangeEmail({
  userPassword,
  setUserPassword,
  handleSave_password,
  userError
}: {
  userPassword: EmailType;
  setUserPassword: React.Dispatch<React.SetStateAction<EmailType>>;
  handleSave_password: () => void;
  userError: EmailErroType;
}) {
  return (
    <div className="bg-white py-10 px-7 rounded-md w-full md:w-3/4 mx-auto shadow">
      <div className="w-full">
        <div className="flex justify-center items-center gap-2 lg:gap-5 w-full lg:flex-row flex-col">
          <div className="mb-5 w-full lg:w-1/2 relative">
            <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">
              Nueva Contraseña
            </label>
            <input
              id="newPassword"
              type="password"
              className="w-full px-3 py-3 border border-gray-600 rounded outline-none"
              value={userPassword.password}
              onChange={e => setUserPassword(pre => ({ ...pre, password: e.target.value }))}
              placeholder="Ingrese su contraseña"
              required
            />
            {userError.password_Error && (
              <p className="absolute text-sm text-red-500">
                {userError.password_Error}
              </p>
            )}
          </div>
          <div className="mb-5 w-full lg:w-1/2 relative">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-3 py-3 border border-gray-600 rounded outline-none"
              value={userPassword.cPassword}
              onChange={e => setUserPassword(pre => ({ ...pre, cPassword: e.target.value }))}
              placeholder="Ingrese su contraseña"
              required
            />
            {userError.password_doNotMatch && (
              <p className="absolute text-sm text-red-500">
                {userError.password_doNotMatch}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button
            type="submit"
            className="bg-orange hover:text-black text-white font-bold py-2.5 px-4 rounded-md focus:outline-none mt-4"
            onClick={handleSave_password}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
