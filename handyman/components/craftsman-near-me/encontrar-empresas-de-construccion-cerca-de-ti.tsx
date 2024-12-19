// pages/encontrar-empresas-de-construccion-cerca-de-ti.tsx

import Head from 'next/head';

const FindConstructionCompaniesNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Encuentra Empresas de Construcción Cerca de Ti - TuPortalDeManitas</title>
        <meta
          name="description"
          content="Encuentra y contrata rápida y fácilmente empresas de construcción cerca de ti. Sigue nuestros sencillos pasos para encontrar a la mejor empresa para tu proyecto de construcción o remodelación."
        />
        <link rel="canonical" href="https://www.tuportaldemanitas.com/encontrar-empresas-de-construccion-cerca-de-ti" />
      </Head>

      {/* <h1 className="text-3xl font-bold text-center mb-8">Encuentra Empresas de Construcción Cerca de Ti</h1> */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cómo Encontrar la Empresa de Construcción Adecuada</h2>
        <p className="mb-4">Buscar la empresa de construcción adecuada para tu proyecto puede ser un desafío, pero con nuestra plataforma es fácil y sencillo. Sigue estos pasos para encontrar a la mejor empresa para tus necesidades de construcción o remodelación:</p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Paso 1: Solicitar</h3>
            <p>Describe tu proyecto de construcción y realiza una solicitud en nuestra plataforma. Cuanto más detallada sea la descripción, mejor podremos ofrecerte propuestas adecuadas.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Paso 2: Comparar Ofertas</h3>
            <p>Recibe ofertas de empresas de construcción cualificadas cerca de ti. Compara las ofertas en función del precio, valoraciones y experiencia.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Paso 3: Contratar la Empresa</h3>
            <p>Selecciona la mejor oferta y contrata a la empresa de construcción. Tu proyecto estará en buenas manos.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">¿Por Qué Nuestra Plataforma?</h2>
        <ul className="list-disc list-inside">
          <li>Proceso fácil y rápido para recibir ofertas.</li>
          <li>Valoraciones y referencias verificadas de las empresas.</li>
          <li>Comparación de precios transparente sin costos ocultos.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cómo Funciona</h2>
        <p>Nuestro objetivo es ofrecerte el mejor servicio para encontrar la empresa de construcción ideal para tu proyecto. Así es como funciona nuestro proceso:</p>
        <ul className="list-disc list-inside">
          <li><strong>Solicitar:</strong> Usa nuestro formulario en línea para describir tu proyecto de construcción.</li>
          <li><strong>Recibir Ofertas:</strong> Te conectamos con empresas de construcción cualificadas cerca de ti.</li>
          <li><strong>Comparar y Seleccionar:</strong> Compara las ofertas recibidas y elige la mejor para ti.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Con nuestra plataforma, puedes estar seguro de encontrar una empresa de construcción experimentada y de confianza para tu proyecto. ¡Empieza ahora tu solicitud y da el primer paso hacia la realización de tu proyecto de construcción o remodelación!
        </p>
      </section>
    </div>
  );
};

export default FindConstructionCompaniesNearby;
