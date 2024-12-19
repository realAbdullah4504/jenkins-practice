import Head from 'next/head';

const IluminacionExterioresCosto = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta la iluminación de exteriores? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con la instalación de iluminación de exteriores y cómo presupuestar para mejorar la iluminación exterior de tu propiedad."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-iluminacion-exteriores`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta la iluminación de exteriores?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Iluminación Básica: €200 - €500 por área</p>
            <p>Incluye luces simples para jardines y entradas.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Iluminación Avanzada: €500 - €1,500 por área</p>
            <p>Incluye luces decorativas, focos LED y sistemas de automatización.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que afectan los costos</h2>
        <ul className="list-disc list-inside">
          <li>Área a iluminar y cantidad de puntos de luz necesarios.</li>
          <li>Tipo de iluminación (LED, solar, halógena) y calidad de los materiales.</li>
          <li>Complejidad de la instalación y necesidad de cableado adicional.</li>
          <li>Costos de mantenimiento y energía.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tipos de Iluminación Exterior</h2>
        <ul className="list-disc list-inside">
          <li>Luces de Jardín: Desde €50 por unidad para luces de camino.</li>
          <li>Focos y Proyectores: Desde €100 por unidad para iluminación focalizada.</li>
          <li>Sistemas de Iluminación Solar: Desde €150 por sistema para iluminación ecológica.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación de presupuesto</h2>
        <p>1. <strong>Diseño de iluminación</strong>: Determinar las áreas a iluminar y el tipo de iluminación requerida.</p>
        <p>2. <strong>Pedido de presupuestos</strong>: Obtener cotizaciones detalladas de proveedores de iluminación y servicios eléctricos.</p>
        <p>3. <strong>Consideración de opciones</strong>: Evaluar opciones de iluminación energéticamente eficientes y de bajo mantenimiento.</p>
        <p>4. <strong>Instalación y mantenimiento</strong>: Planificar la instalación adecuada y considerar costos de mantenimiento a largo plazo.</p>
      </section>

      <section>
        <p className="text-lg">
          Al entender los factores que afectan los costos y planificar adecuadamente, puedes mejorar la iluminación de exteriores de manera efectiva dentro de tu presupuesto.
        </p>
      </section>
    </div>
  );
};

export default IluminacionExterioresCosto;
