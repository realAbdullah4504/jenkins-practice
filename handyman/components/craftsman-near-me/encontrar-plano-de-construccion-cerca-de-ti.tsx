// pages/encontrar-plano-de-construccion-cerca-de-ti.tsx

import Head from 'next/head';

const FindConstructionPlansNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Encuentra Planos de Construcción Cerca de Ti - TuPortalDeManitas</title>
        <meta
          name="description"
          content="Encuentra y contrata rápida y fácilmente planos de construcción cerca de ti. Sigue nuestros sencillos pasos para encontrar al mejor profesional para tus necesidades de planificación y diseño arquitectónico."
        />
        <link rel="canonical" href="https://www.tuportaldemanitas.com/encontrar-plano-de-construccion-cerca-de-ti" />
      </Head>

      {/* <h1 className="text-3xl font-bold text-center mb-8">Encuentra Planos de Construcción Cerca de Ti</h1> */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cómo Encontrar el Plano de Construcción Adecuado</h2>
        <p className="mb-4">Encontrar el plano de construcción adecuado para tu proyecto puede ser un desafío, pero con nuestra plataforma es fácil y sencillo. Sigue estos pasos para encontrar al mejor profesional para tus necesidades de planificación y diseño arquitectónico:</p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Paso 1: Solicitar</h3>
            <p>Describe tus necesidades de construcción y realiza una solicitud en nuestra plataforma. Cuanto más detallada sea la descripción, mejor podremos ofrecerte propuestas adecuadas.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Paso 2: Comparar Ofertas</h3>
            <p>Recibe ofertas de arquitectos y diseñadores cualificados cerca de ti. Compara las ofertas en función del precio, valoraciones y servicios ofrecidos.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Paso 3: Contratar al Profesional</h3>
            <p>Selecciona la mejor oferta y contrata al profesional para tu plano de construcción. Tu proyecto estará en buenas manos.</p>
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
        <p>Nuestro objetivo es ofrecerte el mejor servicio para encontrar el plano de construcción ideal para tu proyecto. Así es como funciona nuestro proceso:</p>
        <ul className="list-disc list-inside">
          <li><strong>Solicitar:</strong> Usa nuestro formulario en línea para describir tus necesidades de planificación y diseño.</li>
          <li><strong>Recibir Ofertas:</strong> Te conectamos con arquitectos y diseñadores cualificados cerca de ti.</li>
          <li><strong>Comparar y Seleccionar:</strong> Compara las ofertas recibidas y elige la mejor para ti.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Con nuestra plataforma, puedes estar seguro de encontrar el profesional adecuado para tus planos de construcción. ¡Empieza ahora tu solicitud y da el primer paso hacia la realización de tu proyecto arquitectónico!
        </p>
      </section>
    </div>
  );
};

export default FindConstructionPlansNearby;
