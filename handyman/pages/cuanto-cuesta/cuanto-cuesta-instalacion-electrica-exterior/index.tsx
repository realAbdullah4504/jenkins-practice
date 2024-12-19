import Head from 'next/head';

const InstalacionElectricaExteriorCosto = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta hacer una instalación eléctrica exterior? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con la instalación eléctrica exterior y cómo presupuestar para este tipo de proyecto."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-instalacion-electrica-exterior`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta hacer una instalación eléctrica exterior?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Instalación Básica: €500 - €1,500</p>
            <p>Incluye cableado básico y tomas de corriente exterior.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Instalación Compleja: €1,500 - €5,000 o más</p>
            <p>Incluye iluminación, automatización y cableado extenso.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que afectan los costos</h2>
        <ul className="list-disc list-inside">
          <li>Extensión y complejidad del proyecto de instalación.</li>
          <li>Necesidad de equipos de iluminación y automatización.</li>
          <li>Costos de mano de obra y materiales específicos.</li>
          <li>Regulaciones locales y permisos requeridos.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Componentes de la Instalación</h2>
        <ul className="list-disc list-inside">
          <li>Cableado subterráneo y conexiones a la red eléctrica existente.</li>
          <li>Luces de jardín, iluminación de paisajes y tomas de corriente.</li>
          <li>Sistemas de control y automatización para exteriores.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación de presupuesto</h2>
        <p>1. <strong>Evaluación inicial</strong>: Determinar la extensión y requisitos específicos del proyecto.</p>
        <p>2. <strong>Solicitud de presupuestos</strong>: Obtener estimaciones detalladas de electricistas y contratistas.</p>
        <p>3. <strong>Comparación de opciones</strong>: Evaluar la experiencia y reputación de los proveedores.</p>
        <p>4. <strong>Permisos y regulaciones</strong>: Confirmar los permisos necesarios y cumplir con las normativas locales.</p>
      </section>

      <section>
        <p className="text-lg">
          Al comprender los factores que afectan los costos y planificar adecuadamente, puedes gestionar eficazmente la instalación eléctrica exterior dentro de tu presupuesto.
        </p>
      </section>
    </div>
  );
};

export default InstalacionElectricaExteriorCosto;