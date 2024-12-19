import Head from 'next/head';

const Alicatar = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta alicatar? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con el proceso de alicatado y cómo planificar tu presupuesto para esta obra de construcción."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/alicatar`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta alicatar?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Estimación Básica: 20€ - 40€ por metro cuadrado</p>
            <p>Incluye materiales básicos y mano de obra estándar.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Estimación Completa: 40€ - 80€ por metro cuadrado</p>
            <p>Incluye materiales de alta gama y diseño personalizado.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que Afectan los Costos</h2>
        <ul className="list-disc list-inside">
          <li>Tamaño del Área a Alicatar: Costo varía según la extensión de la superficie a cubrir.</li>
          <li>Calidad y Tipo de Azulejos: Precios pueden variar significativamente según la selección de azulejos.</li>
          <li>Preparación de Superficie: Necesidad de nivelación y preparación del área antes de alicatar.</li>
          <li>Ubicación y Accesibilidad: Costos pueden ser afectados por la ubicación del proyecto y la accesibilidad.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Precios Promedio para Alicatar</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Estimación Básica</strong>: 20€ - 40€ por metro cuadrado, incluyendo materiales básicos y mano de obra estándar.
          </li>
          <li>
            <strong>Estimación Completa</strong>: 40€ - 80€ por metro cuadrado, incluyendo materiales de alta gama y diseño personalizado.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación del Presupuesto</h2>
        <p>1. <strong>Evaluación Inicial</strong>: Determina el área a alicatar y los requisitos específicos de diseño.</p>
        <p>2. <strong>Selección de Materiales</strong>: Elige azulejos y materiales de acuerdo a tu presupuesto y estilo deseado.</p>
        <p>3. <strong>Obtención de Cotizaciones</strong>: Solicita múltiples cotizaciones de contratistas locales para comparar precios y servicios.</p>
        <p>4. <strong>Consideraciones Finales</strong>: Incluye costos adicionales como mano de obra especializada y detalles de acabado.</p>
      </section>

      <section>
        <p className="text-lg">
          El costo de alicatar puede variar considerablemente según varios factores. Planifica tu presupuesto detalladamente para asegurar que tu proyecto se realice dentro de tus expectativas.
        </p>
      </section>
    </div>
  );
};

export default Alicatar;
