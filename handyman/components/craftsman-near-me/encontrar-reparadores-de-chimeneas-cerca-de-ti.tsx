// pages/encontrar-reparadores-de-chimeneas-cerca-de-ti.tsx

import Head from 'next/head';

const FindChimneyBuildersNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Encuentra Reparadores de Chimeneas Cerca de Ti - TuPortalDeManitas</title>
        <meta
          name="description"
          content="Encuentra y contrata rápida y fácilmente reparadores de chimeneas cerca de ti. Sigue nuestros sencillos pasos para encontrar al mejor profesional para la construcción, reparación y mantenimiento de tu chimenea."
        />
        <link rel="canonical" href="https://www.tuportaldemanitas.com/encontrar-reparadores-de-chimeneas-cerca-de-ti" />
      </Head>

      {/* <h1 className="text-3xl font-bold text-center mb-8">Encuentra Reparadores de Chimeneas Cerca de Ti</h1> */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cómo Encontrar al Reparador de Chimeneas Adecuado</h2>
        <p className="mb-4">Buscar el profesional adecuado para la construcción, reparación o mantenimiento de tu chimenea puede ser un desafío, pero con nuestra plataforma es fácil y sencillo. Sigue estos pasos para encontrar al mejor experto para tu chimenea:</p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Paso 1: Solicitar</h3>
            <p>Describe tu proyecto relacionado con la chimenea y realiza una solicitud en nuestra plataforma. Cuanto más detallada sea la descripción, mejor podremos ofrecerte propuestas adecuadas.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Paso 2: Comparar Ofertas</h3>
            <p>Recibe ofertas de reparadores y constructores de chimeneas cualificados cerca de ti. Compara las ofertas en función del precio, valoraciones y experiencia.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Paso 3: Contratar al Profesional</h3>
            <p>Selecciona la mejor oferta y contrata al profesional para tu chimenea. Tu proyecto estará en buenas manos.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">¿Por Qué Nuestra Plataforma?</h2>
        <ul className="list-disc list-inside">
          <li>Proceso fácil y rápido para recibir ofertas.</li>
          <li>Valoraciones y referencias verificadas de los profesionales.</li>
          <li>Comparación de precios transparente sin costos ocultos.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cómo Funciona</h2>
        <p>Nuestro objetivo es ofrecerte el mejor servicio para encontrar al reparador o constructor de chimeneas ideal para tu proyecto. Así es como funciona nuestro proceso:</p>
        <ul className="list-disc list-inside">
          <li><strong>Solicitar:</strong> Usa nuestro formulario en línea para describir tus necesidades relacionadas con la chimenea.</li>
          <li><strong>Recibir Ofertas:</strong> Te conectamos con reparadores y constructores de chimeneas cualificados cerca de ti.</li>
          <li><strong>Comparar y Seleccionar:</strong> Compara las ofertas recibidas y elige la mejor para ti.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Con nuestra plataforma, puedes estar seguro de encontrar un reparador de chimeneas experimentado y de confianza para tu proyecto. ¡Empieza ahora tu solicitud y da el primer paso hacia la solución perfecta para tu chimenea!
        </p>
      </section>
    </div>
  );
};

export default FindChimneyBuildersNearby;
