import Head from 'next/head';

const InstalacionCalefaccionCoste = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta la instalación de calefacción? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costes asociados con la instalación de sistemas de calefacción y cómo presupuestar para esta renovación en tu hogar."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-instalacion-calefaccion`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta la instalación de calefacción?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Sistema estándar: €2000 - €5000</p>
            <p>Incluye instalación de radiadores y caldera básica.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Opciones avanzadas: €5000 - €10000+</p>
            <p>Puede incluir sistemas de calefacción de suelo radiante, calderas de alta eficiencia o sistemas inteligentes.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que afectan los costos</h2>
        <ul className="list-disc list-inside">
          <li>Tipo de sistema: Radiadores, suelo radiante, calderas, bombas de calor, etc.</li>
          <li>Área a calentar: Tamaño del espacio que necesitas calentar.</li>
          <li>Calidad y eficiencia: Equipos estándar vs. equipos de alta eficiencia energética.</li>
          <li>Instalación y mano de obra: Costos adicionales por instalación profesional y modificaciones estructurales si son necesarias.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Presupuesto y planificación</h2>
        <p>1. <strong>Evaluación de necesidades de calefacción</strong>: Determinar el tipo de sistema y la capacidad necesaria.</p>
        <p>2. <strong>Obtención de presupuestos</strong>: Solicitar cotizaciones detalladas de varios proveedores para comparar precios y servicios.</p>
        <p>3. <strong>Planificación de la instalación</strong>: Coordinar la fecha y el tiempo de la instalación para minimizar la interrupción y garantizar la calidad del trabajo.</p>
        <p>4. <strong>Consideraciones adicionales</strong>: Incluir costos como mantenimiento futuro y garantías de los equipos.</p>
      </section>

      <section>
        <p className="text-lg">
          Al considerar la instalación de calefacción, ten en cuenta estos factores para asegurar que el proyecto se ajuste a tu presupuesto y necesidades de confort térmico.
        </p>
      </section>
    </div>
  );
};

export default InstalacionCalefaccionCoste;