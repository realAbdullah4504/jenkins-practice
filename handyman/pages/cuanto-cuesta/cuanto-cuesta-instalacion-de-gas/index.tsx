import Head from 'next/head';

const InstalacionGasCoste = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta la instalación de gas? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con la instalación de gas y cómo planificar tu presupuesto para esta instalación."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-instalacion-de-gas`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta la instalación de gas?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Instalación Básica: 500€ - 1,000€</p>
            <p>Incluye la instalación de la red de gas básica para una vivienda pequeña.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Instalación Compleja: 1,000€ - 5,000€</p>
            <p>Incluye instalación para viviendas grandes o instalaciones con requerimientos especiales.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que Afectan los Costos</h2>
        <ul className="list-disc list-inside">
          <li>Tamaño y Complejidad: El tamaño de la vivienda y la complejidad de la instalación pueden afectar los costos.</li>
          <li>Material y Equipo: Costos variarán según el tipo de tuberías y equipos necesarios para la instalación.</li>
          <li>Normativas Locales: Cumplimiento de normativas y permisos locales puede influir en los costos finales.</li>
          <li>Ubicación: Precios pueden variar según la ubicación geográfica y la accesibilidad del lugar.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Precios Promedio para Instalación de Gas</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Instalación Básica</strong>: 500€ - 1,000€, incluyendo la instalación básica de la red de gas.
          </li>
          <li>
            <strong>Instalación Compleja</strong>: 1,000€ - 5,000€, incluyendo instalaciones más complejas o grandes.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación del Presupuesto</h2>
        <p>1. <strong>Evaluación de Requerimientos</strong>: Determinar la cantidad de gas necesaria y la ubicación de los puntos de conexión.</p>
        <p>2. <strong>Solicitar Propuestas y Evaluaciones</strong>: Obtener múltiples presupuestos de instaladores de gas para comparar costos y servicios.</p>
        <p>3. <strong>Normativas y Permisos</strong>: Asegurarse de cumplir con todas las normativas locales y obtener los permisos necesarios antes de la instalación.</p>
        <p>4. <strong>Seguridad y Calidad</strong>: Elegir instaladores de gas certificados y con experiencia para garantizar una instalación segura y de calidad.</p>
      </section>

      <section>
        <p className="text-lg">
          Al planificar y presupuestar cuidadosamente la instalación de gas, puedes garantizar un sistema seguro y eficiente para tu hogar o negocio.
        </p>
      </section>
    </div>
  );
};

export default InstalacionGasCoste;