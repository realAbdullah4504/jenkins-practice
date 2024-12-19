import Head from 'next/head';

const InstalacionCocinaCosto = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta la instalación de una cocina? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos típicos asociados con la instalación de una cocina nueva y cómo presupuestar para esta renovación."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-instalacion-cocina`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta la instalación de una cocina?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Instalación Básica: €500 - €1,000+</p>
            <p>Incluye montaje de muebles estándar y conexión de electrodomésticos básicos.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Instalación Completa: €1,000 - €3,000+</p>
            <p>Incluye montaje de muebles personalizados y conexión de electrodomésticos premium.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que afectan los costos</h2>
        <ul className="list-disc list-inside">
          <li>Complejidad del diseño y tamaño de la cocina.</li>
          <li>Calidad y tipo de materiales utilizados en los muebles y encimeras.</li>
          <li>Número y tipo de electrodomésticos a instalar.</li>
          <li>Necesidad de servicios adicionales como fontanería y electricidad.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Pasos para presupuestar</h2>
        <p>1. <strong>Evaluación de necesidades</strong>: Define el diseño y características de tu nueva cocina.</p>
        <p>2. <strong>Obtención de presupuestos</strong>: Solicita cotizaciones detalladas de varios contratistas.</p>
        <p>3. <strong>Planificación de detalles</strong>: Considera costos adicionales y tiempos de entrega.</p>
      </section>

      <section>
        <p className="text-lg">
          Con una planificación adecuada y la elección correcta de materiales y servicios, puedes llevar a cabo la instalación de tu cocina dentro de tu presupuesto.
        </p>
      </section>
    </div>
  );
};

export default InstalacionCocinaCosto;