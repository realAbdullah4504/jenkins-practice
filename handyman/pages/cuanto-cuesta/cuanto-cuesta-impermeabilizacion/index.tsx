import Head from 'next/head';

const CuantoCuestaImpermeabilizacion = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta la impermeabilización? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costes asociados con la impermeabilización de techos, terrazas, y sótanos, y cómo planificar tu presupuesto."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-impermeabilizacion`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta la impermeabilización?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Techos: €20 - €50 por metro cuadrado</p>
            <p>Dependiendo del tipo de material y método de impermeabilización.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Terrazas: €30 - €80 por metro cuadrado</p>
            <p>Incluyendo preparación de superficie y materiales de sellado.</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Sótanos: €50 - €120 por metro cuadrado</p>
            <p>Dependiendo de la accesibilidad y nivel de impermeabilización requerido.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que afectan los costos</h2>
        <ul className="list-disc list-inside">
          <li>Tipo de superficie: Techo, terraza, sótano, etc.</li>
          <li>Método de impermeabilización: Membranas, pinturas, sistemas de sellado.</li>
          <li>Área a cubrir: Tamaño del área que necesita impermeabilización.</li>
          <li>Estado de la superficie: Necesidad de preparación previa o reparaciones.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Presupuesto y planificación</h2>
        <p>1. <strong>Evaluación inicial</strong>: Determinar el tipo de superficie y área a impermeabilizar.</p>
        <p>2. <strong>Obtener cotizaciones</strong>: Comparar precios y servicios de diferentes empresas de impermeabilización.</p>
        <p>3. <strong>Considerar calidad y durabilidad</strong>: Evaluar opciones que ofrezcan garantías y durabilidad en el tiempo.</p>
        <p>4. <strong>Planificar mantenimiento</strong>: Incluir costos futuros de mantenimiento y reparación.</p>
      </section>

      <section>
        <p className="text-lg">
          Impermeabilizar adecuadamente puede proteger tu propiedad de daños por agua y aumentar su vida útil.
        </p>
      </section>
    </div>
  );
};

export default CuantoCuestaImpermeabilizacion;