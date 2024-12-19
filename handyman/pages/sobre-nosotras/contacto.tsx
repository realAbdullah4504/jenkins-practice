import { FC } from 'react';

const Contact: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Contáctanos</h1>
        <p className="mb-4">¿Tienes preguntas, sugerencias o necesitas ayuda? ¡Estamos aquí para ayudarte!</p>
        <form
          action="#"
          method="POST"
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Tu correo electrónico"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Tu mensaje"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Enviar
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>También puedes contactarnos por correo electrónico o por teléfono:</p>
          <p className="mt-2">Email: <a href="mailto:example@example.com" className="text-indigo-600">example@example.com</a></p>
          <p>Teléfono: <a href="tel:+1234567890" className="text-indigo-600">+1 (234) 567-890</a></p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
