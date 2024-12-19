import Head from 'next/head';

const HormigonPulidoCoste = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta el hormigón pulido? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con el hormigón pulido y cómo planificar tu presupuesto para este proyecto de pavimentación."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-hormigon-pulido`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta el hormigón pulido?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Hormigón Pulido Básico: 60€ - 80€ por m²</p>
            <p>Incluye preparación del suelo, vertido de hormigón, pulido y sellado básico.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Hormigón Pulido Decorativo: 80€ - 120€ por m² o más</p>
            <p>Incluye diseño personalizado, integración de color y acabados decorativos especiales.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que Afectan los Costos</h2>
        <ul className="list-disc list-inside">
          <li>Tipo de Hormigón: Hormigón estándar vs. hormigón decorativo con aditivos.</li>
          <li>Acabados y Diseño: Acabado pulido básico vs. acabado decorativo con patrones o colores.</li>
          <li>Preparación del Suelo: Necesidad de nivelación o preparación especial del suelo antes del vertido del hormigón.</li>
          <li>Tamaño del Área: El área total a cubrir con hormigón pulido.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Precios Promedio para Hormigón Pulido</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Hormigón Pulido Básico</strong>: 60€ - 80€ por m², incluyendo preparación del suelo, vertido de hormigón, pulido y sellado básico.
          </li>
          <li>
            <strong>Hormigón Pulido Decorativo</strong>: 80€ - 120€ por m² o más, incluyendo diseño personalizado, integración de color y acabados decorativos especiales.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación del Presupuesto</h2>
        <p>1. <strong>Definición de Necesidades</strong>: Determina el tipo de hormigón pulido que deseas y sus especificaciones.</p>
        <p>2. <strong>Consulta Profesional</strong>: Obtén varias cotizaciones de contratistas especializados en hormigón pulido para comparar precios y servicios ofrecidos.</p>
        <p>3. <strong>Selección de Acabados y Diseño</strong>: Elige el acabado y diseño que se ajusten a tu presupuesto y requisitos estéticos.</p>
        <p>4. <strong>Planificación de la Instalación</strong>: Coordina la fecha y el tiempo estimado para la instalación del hormigón pulido con el contratista seleccionado.</p>
      </section>

      <section>
        <p className="text-lg">
          Al planificar cuidadosamente el presupuesto para el hormigón pulido, puedes transformar significativamente el aspecto y funcionalidad de tu espacio exterior o interior.
        </p>
      </section>
    </div>
  );
};

export default HormigonPulidoCoste;