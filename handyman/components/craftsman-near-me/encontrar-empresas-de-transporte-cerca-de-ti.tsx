// pages/encontrar-empresas-de-transporte-cerca-de-ti.tsx

import Head from 'next/head';

const FindTransportCompaniesNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Encuentra Empresas de Transporte Cerca de Ti - TuPortalDeManitas</title>
        <meta
          name="description"
          content="Encuentra y contrata rápida y fácilmente empresas de transporte cerca de ti. Sigue nuestros sencillos pasos para encontrar al mejor proveedor para tus necesidades de mudanza, transporte de mercancías y más."
        />
        <link rel="canonical" href="https://www.tuportaldemanitas.com/encontrar-empresas-de-transporte-cerca-de-ti" />
      </Head>

      {/* <h1 className="text-3xl font-bold text-center mb-8">Encuentra Empresas de Transporte Cerca de Ti</h1> */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cómo Encontrar la Empresa de Transporte Adecuada</h2>
        <p className="mb-4">Encontrar la empresa de transporte adecuada para tu proyecto puede ser un desafío, pero con nuestra plataforma es fácil y sencillo. Sigue estos pasos para encontrar el mejor proveedor para tus necesidades de transporte:</p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Paso 1: Solicitar</h3>
            <p>Describe tu necesidad de transporte, ya sea para una mudanza, transporte de mercancías o cualquier otro servicio relacionado. Incluye detalles como el tamaño del envío, la distancia y cualquier requerimiento especial.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Paso 2: Comparar Ofertas</h3>
            <p>Recibe ofertas de empresas de transporte cualificadas cerca de ti. Compara las ofertas en función del precio, los servicios ofrecidos y las valoraciones.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Paso 3: Contratar al Proveedor</h3>
            <p>Selecciona la mejor oferta y contrata a la empresa de transporte. Tu envío estará en buenas manos.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">¿Por Qué Nuestra Plataforma?</h2>
        <ul className="list-disc list-inside">
          <li>Proceso fácil y rápido para recibir ofertas.</li>
          <li>Valoraciones y referencias verificadas de los proveedores.</li>
          <li>Comparación de precios transparente sin costos ocultos.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cómo Funciona</h2>
        <p>Nuestro objetivo es ofrecerte el mejor servicio para encontrar la empresa de transporte ideal para tu proyecto. Así es como funciona nuestro proceso:</p>
        <ul className="list-disc list-inside">
          <li><strong>Solicitar:</strong> Usa nuestro formulario en línea para describir tus necesidades de transporte.</li>
          <li><strong>Recibir Ofertas:</strong> Te conectamos con empresas de transporte cualificadas cerca de ti.</li>
          <li><strong>Comparar y Seleccionar:</strong> Compara las ofertas recibidas y elige la mejor para ti.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Con nuestra plataforma, puedes estar seguro de encontrar una empresa de transporte experimentada y de confianza para tu proyecto. ¡Empieza ahora tu solicitud y da el primer paso hacia un transporte eficiente y seguro!
        </p>
      </section>
    </div>
  );
};

export default FindTransportCompaniesNearby;
