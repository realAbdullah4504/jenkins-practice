import Head from 'next/head';

const InstalacionAguaCalienteSanitariaCoste = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta la instalación de agua caliente sanitaria? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con la instalación de agua caliente sanitaria y cómo planificar tu presupuesto para este servicio."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-instalacion-agua-caliente-sanitaria`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta la instalación de agua caliente sanitaria?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Instalación Básica: 800€ - 1.500€</p>
            <p>Incluye calentador estándar y mano de obra básica.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Instalación Compleja: 1.500€ - 3.000€</p>
            <p>Incluye caldera o sistemas de agua caliente sanitaria más complejos.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que Afectan los Costos</h2>
        <ul className="list-disc list-inside">
          <li>Tipo de Sistema: Calentador de agua, caldera, sistema solar térmico, etc.</li>
          <li>Tamaño del Hogar: Necesidades de agua caliente basadas en el número de residentes.</li>
          <li>Complejidad de la Instalación: Requiere modificaciones en la tubería existente o instalación desde cero.</li>
          <li>Calidad y Eficiencia Energética: Costos iniciales versus ahorros a largo plazo.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Precios Promedio para Instalación de Agua Caliente Sanitaria</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Instalación Básica</strong>: 800€ - 1.500€, incluye calentador estándar y mano de obra básica.
          </li>
          <li>
            <strong>Instalación Compleja</strong>: 1.500€ - 3.000€, incluye caldera o sistemas de agua caliente sanitaria más complejos.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación del Presupuesto</h2>
        <p>1. <strong>Evaluar Necesidades de Agua Caliente</strong>: Determina el flujo de agua caliente necesario y eficiencia energética.</p>
        <p>2. <strong>Solicitar Varios Presupuestos</strong>: Compara costos y opciones ofrecidas por diferentes profesionales.</p>
        <p>3. <strong>Consideraciones Adicionales</strong>: Garantías, mantenimiento y durabilidad del sistema instalado.</p>
      </section>

      <section>
        <p className="text-lg">
          La instalación de agua caliente sanitaria puede variar en costo dependiendo de varios factores. Es importante obtener varias cotizaciones y entender completamente los requerimientos antes de proceder.
        </p>
      </section>
    </div>
  );
};

export default InstalacionAguaCalienteSanitariaCoste;
