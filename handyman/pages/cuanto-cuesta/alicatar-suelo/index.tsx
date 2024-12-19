import Head from 'next/head';

const AlicatarSuelo = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta alicatar un suelo? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con el alicatado de suelos y cómo planificar tu presupuesto para esta obra de construcción."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/alicatar-suelo`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta alicatar un suelo?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Estimación Básica: 20€ - 40€ por m²</p>
            <p>Incluye mano de obra y materiales básicos.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Estimación Completa: 40€ - 80€ por m²</p>
            <p>Incluye materiales premium y diseño personalizado.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que Afectan los Costos</h2>
        <ul className="list-disc list-inside">
          <li>Tamaño y Tipo de Azulejo: Costo varía según el tipo y tamaño del azulejo seleccionado.</li>
          <li>Preparación del Suelo: Necesidad de nivelación o preparación especial del suelo.</li>
          <li>Diseño y Patrón: Costos adicionales por patrones complejos o diseños personalizados.</li>
          <li>Localización y Accesibilidad: Costos pueden variar según la ubicación del proyecto y la accesibilidad.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Precios Promedio para Alicatar Suelos</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Estimación Básica</strong>: 20€ - 40€ por m², incluyendo mano de obra y materiales básicos.
          </li>
          <li>
            <strong>Estimación Completa</strong>: 40€ - 80€ por m², incluyendo materiales premium y diseño personalizado.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación del Presupuesto</h2>
        <p>1. <strong>Evaluación Inicial</strong>: Determina la superficie a alicatar y selecciona el tipo de azulejo.</p>
        <p>2. <strong>Solicitud de Presupuestos</strong>: Obtén varias cotizaciones detalladas de contratistas locales.</p>
        <p>3. <strong>Selección de Materiales</strong>: Considera la calidad y el diseño de los azulejos para tu proyecto.</p>
        <p>4. <strong>Consideraciones Finales</strong>: Asegúrate de incluir costos adicionales como el desecho de materiales viejos y limpieza final.</p>
      </section>

      <section>
        <p className="text-lg">
          El costo de alicatar un suelo puede variar significativamente según varios factores. Planifica tu presupuesto cuidadosamente para asegurar que tu proyecto se realice dentro de tus expectativas.
        </p>
      </section>
    </div>
  );
};

export default AlicatarSuelo;
