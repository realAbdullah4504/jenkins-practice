import Head from 'next/head';

const InstalacionBaniosCosto = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta la instalación de baños? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con la instalación de baños y cómo presupuestar para esta renovación en tu hogar."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-instalacion-banos`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta la instalación de baños?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Instalación Básica: €1,000 - €3,000 por baño</p>
            <p>Incluye renovación básica de baño con materiales estándar.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Instalación Avanzada: €3,000 - €10,000 por baño</p>
            <p>Incluye remodelación completa con materiales de alta gama y diseño personalizado.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que afectan los costos</h2>
        <ul className="list-disc list-inside">
          <li>Tamaño y complejidad del proyecto de instalación.</li>
          <li>Calidad de los materiales seleccionados (estándar vs. premium).</li>
          <li>Mano de obra y tarifas de contratistas.</li>
          <li>Necesidad de ajustes estructurales o modificaciones en la fontanería y electricidad.</li>
          <li>Ubicación geográfica y accesibilidad del sitio de trabajo.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Componentes de la instalación</h2>
        <ul className="list-disc list-inside">
          <li>Demolición y eliminación de baño existente.</li>
          <li>Instalación de nuevos sanitarios, lavabos y duchas.</li>
          <li>Azulejos, suelos y acabados de pared.</li>
          <li>Instalación de fontanería y sistemas eléctricos necesarios.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación de presupuesto</h2>
        <p>1. <strong>Evaluación inicial</strong>: Determinar el alcance y los requisitos del proyecto de instalación.</p>
        <p>2. <strong>Selección de materiales</strong>: Comparar precios y características entre diferentes opciones de materiales.</p>
        <p>3. <strong>Presupuesto de materiales y mano de obra</strong>: Incluir costos de materiales de construcción y servicios profesionales.</p>
        <p>4. <strong>Contratación de contratistas</strong>: Asegurarse de seleccionar contratistas con experiencia y garantías.</p>
      </section>

      <section>
        <p className="text-lg">
          Con una planificación adecuada y ajustando tu presupuesto, puedes realizar la instalación de baños de manera efectiva y mejorar tu hogar según tus necesidades.
        </p>
      </section>
    </div>
  );
};

export default InstalacionBaniosCosto;