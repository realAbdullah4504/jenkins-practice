import Head from 'next/head';

const CuantoCuestaIngeniero = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta contratar a un ingeniero? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con la contratación de ingenieros para diferentes proyectos y cómo planificar tu presupuesto para estos servicios."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-ingeniero`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta contratar a un ingeniero?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Tarifa por Hora: 50€ - 150€</p>
            <p>Dependiendo de la especialización y la experiencia del ingeniero.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Tarifa por Proyecto: 1,000€ - 20,000€</p>
            <p>Para proyectos completos que requieren diseño, planificación y supervisión.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que Afectan los Costos</h2>
        <ul className="list-disc list-inside">
          <li>Especialización del Ingeniero: Ingenieros especializados pueden cobrar tarifas más altas.</li>
          <li>Complejidad del Proyecto: Proyectos grandes o técnicamente complejos pueden requerir tarifas más altas.</li>
          <li>Ubicación Geográfica: Los costos pueden variar según la región y la demanda de servicios de ingeniería.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Precios Promedio para Contratar a un Ingeniero</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Tarifa por Hora</strong>: 50€ - 150€, dependiendo de la especialización y experiencia del ingeniero.
          </li>
          <li>
            <strong>Tarifa por Proyecto</strong>: 1,000€ - 20,000€, para proyectos que requieren diseño, planificación y supervisión.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación del Presupuesto</h2>
        <p>1. <strong>Evaluar las Necesidades del Proyecto</strong>: Determinar qué servicios de ingeniería son necesarios.</p>
        <p>2. <strong>Solicitar Varios Presupuestos</strong>: Obtener cotizaciones detalladas de diferentes ingenieros o firmas.</p>
        <p>3. <strong>Revisar Experiencia y Referencias</strong>: Elegir un ingeniero con experiencia y buenas referencias.</p>
        <p>4. <strong>Establecer un Contrato Claro</strong>: Definir claramente los términos del proyecto y las responsabilidades del ingeniero.</p>
      </section>

      <section>
        <p className="text-lg">
          Contratar a un ingeniero calificado es fundamental para el éxito de proyectos de construcción e ingeniería. Planificar el presupuesto adecuadamente te ayudará a asegurar un servicio de calidad y cumplir con los objetivos de tu proyecto.
        </p>
      </section>
    </div>
  );
};

export default CuantoCuestaIngeniero;