import Head from 'next/head';

const HormigonImpresoCoste = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta el hormigón impreso? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costes asociados con el hormigón impreso y cómo presupuestar para proyectos de pavimentación y decoración exterior."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-hormigon-impreso`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta el hormigón impreso?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Precio por metro cuadrado: €20 - €30</p>
            <p>Incluye el coste de la preparación del terreno, el hormigón impreso y el sellado final.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Costes adicionales: €5 - €10 por metro cuadrado</p>
            <p>Pueden incluir opciones de color, patrones personalizados y selladores especiales.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que afectan los costos</h2>
        <ul className="list-disc list-inside">
          <li>Tamaño del área: Cuanto mayor sea el área a cubrir, más bajo podría ser el costo por metro cuadrado.</li>
          <li>Personalización: Opciones adicionales como colores y patrones personalizados pueden aumentar el costo total.</li>
          <li>Accesibilidad del sitio: Dificultades de acceso al sitio pueden requerir más trabajo y aumentar el precio.</li>
          <li>Ubicación geográfica: Los costos pueden variar según la región y la disponibilidad de contratistas especializados.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Presupuesto y planificación</h2>
        <p>1. <strong>Evaluación del proyecto</strong>: Determinar el área a cubrir y los requisitos específicos del diseño.</p>
        <p>2. <strong>Obtención de cotizaciones</strong>: Solicitar presupuestos detallados a contratistas especializados en hormigón impreso.</p>
        <p>3. <strong>Planificación del calendario</strong>: Coordinar la preparación del terreno y la aplicación del hormigón según el clima y las condiciones.</p>
        <p>4. <strong>Consideraciones adicionales</strong>: Incluir costos extras como selladores adicionales o mantenimiento futuro.</p>
      </section>

      <section>
        <p className="text-lg">
          Al planificar la instalación de hormigón impreso, ten en cuenta estos factores para asegurar que el proyecto se realice dentro del presupuesto y cumpla con tus expectativas estéticas y funcionales.
        </p>
      </section>
    </div>
  );
};

export default HormigonImpresoCoste;
