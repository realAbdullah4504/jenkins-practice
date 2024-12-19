import Head from 'next/head';

const IluminacionPiscinasCoste = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta la iluminación de piscinas? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con la iluminación de piscinas y cómo presupuestar para este tipo de servicios en tu hogar."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-iluminacion-piscinas`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta la iluminación de piscinas?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Iluminación básica: €500 - €1,500</p>
            <p>Sistema básico de iluminación con focos estándar.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Iluminación premium: €1,500 - €5,000</p>
            <p>Sistema avanzado de iluminación con tecnología LED, control remoto y múltiples colores.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que afectan los costos</h2>
        <ul className="list-disc list-inside">
          <li>Tipo de iluminación: Desde sistemas básicos hasta iluminación LED avanzada.</li>
          <li>Número de luces: Más luces y características adicionales aumentan el costo.</li>
          <li>Accesorios y control: Costos adicionales por accesorios como control remoto, cambio de colores, etc.</li>
          <li>Costos de instalación: Dependiendo de la complejidad de la instalación y los requisitos del sitio.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Precios promedio para iluminación de piscinas</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Iluminación básica</strong>: €500 - €1,500, sistema básico de iluminación con focos estándar.
          </li>
          <li>
            <strong>Iluminación premium</strong>: €1,500 - €5,000, sistema avanzado de iluminación con tecnología LED y múltiples funciones.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación de presupuesto</h2>
        <p>1. <strong>Selección de iluminación</strong>: Evaluar opciones y decidir entre sistemas básicos y premium.</p>
        <p>2. <strong>Costos adicionales</strong>: Considerar accesorios y costos de mantenimiento a largo plazo.</p>
        <p>3. <strong>Instalación profesional</strong>: Contratar instaladores con experiencia para una instalación segura y eficiente.</p>
      </section>

      <section>
        <p className="text-lg">
          Con una planificación adecuada y considerando los factores que afectan los costos, puedes disfrutar de una iluminación de piscinas que mejore la estética y funcionalidad de tu área de piscina.
        </p>
      </section>
    </div>
  );
};

export default IluminacionPiscinasCoste;