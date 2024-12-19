import Head from 'next/head';

const AerotermiaCoste = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta instalar aerotermia? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costes asociados con la instalación de sistemas de aerotermia y cómo presupuestar para proyectos de climatización eficiente."
        />
        <link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-instalar-aerotermia`}
				/>
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta instalar aerotermia?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Instalación Básica: €6,000 - €10,000</p>
            <p>Incluye sistema de aerotermia estándar y configuración básica.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Instalación Premium: €10,000 - €15,000</p>
            <p>Incluye sistema de alta eficiencia y configuración avanzada.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que afectan los costos</h2>
        <ul className="list-disc list-inside">
          <li>Tipo y capacidad del sistema: Sistemas estándar vs. de alta eficiencia con mayor capacidad de climatización.</li>
          <li>Tamaño y diseño de la propiedad: Dimensiones y distribución afectan la complejidad de la instalación.</li>
          <li>Ubicación: Costos pueden variar según la ubicación geográfica y las condiciones del sitio.</li>
          <li>Incentivos y subvenciones: Disponibilidad de ayudas gubernamentales y programas de eficiencia energética.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Precios promedio para instalación de aerotermia</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Instalación Básica</strong>: €6,000 - €10,000, incluyendo sistema de aerotermia estándar y configuración básica.
          </li>
          <li>
            <strong>Instalación Premium</strong>: €10,000 - €15,000, incluyendo sistema de alta eficiencia y configuración avanzada.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación de presupuesto</h2>
        <p>1. <strong>Evaluar necesidades de climatización</strong>: Determinar la demanda de calefacción y refrigeración para dimensionar adecuadamente el sistema.</p>
        <p>2. <strong>Consultar con expertos en aerotermia</strong>: Obtener varias cotizaciones y opiniones de instaladores especializados.</p>
        <p>3. <strong>Explorar opciones de financiamiento</strong>: Investigar opciones de financiamiento y beneficios fiscales disponibles para proyectos de eficiencia energética.</p>
        <p>4. <strong>Considerar el retorno de la inversión</strong>: Calcular el ahorro energético a largo plazo frente al costo inicial de instalación.</p>
      </section>

      <section>
        <p className="text-lg">
          Al planificar tu presupuesto y entender los factores que afectan los costos de instalación de aerotermia, puedes tomar decisiones informadas para adoptar sistemas de climatización eficientes y sostenibles.
        </p>
      </section>
    </div>
  );
};

export default AerotermiaCoste;