import Head from 'next/head';

const InsonorizacionCoste = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta la insonorización? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con la insonorización y cómo planificar tu presupuesto para proyectos de reducción de ruido en espacios interiores."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-insonorizacion`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta la insonorización?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Coste Básico: 50€ - 100€ por metro cuadrado</p>
            <p>Incluye materiales estándar y técnicas básicas de insonorización.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Coste Avanzado: 100€ - 200€ por metro cuadrado</p>
            <p>Incluye materiales premium y soluciones avanzadas de insonorización.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que Afectan los Costos</h2>
        <ul className="list-disc list-inside">
          <li>Tipo de Espacio: Impacto del uso y necesidades específicas de insonorización.</li>
          <li>Materiales Utilizados: Calidad y tipo de materiales de insonorización seleccionados.</li>
          <li>Técnicas de Instalación: Complejidad y métodos utilizados para la insonorización.</li>
          <li>Ubicación y Accesibilidad: Impacto en costos de logística y transporte.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Precios Promedio para Insonorización</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Coste Básico</strong>: 50€ - 100€ por metro cuadrado, incluyendo materiales estándar y técnicas básicas.
          </li>
          <li>
            <strong>Coste Avanzado</strong>: 100€ - 200€ por metro cuadrado, incluyendo materiales premium y soluciones avanzadas.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación del Presupuesto</h2>
        <p>1. <strong>Consulta Inicial</strong>: Evaluación del espacio y discusión de necesidades específicas con profesionales de insonorización.</p>
        <p>2. <strong>Selección de Material</strong>: Elección de materiales de insonorización según las especificaciones del proyecto y presupuesto disponible.</p>
        <p>3. <strong>Obtención de Presupuestos Detallados</strong>: Solicitar cotizaciones a varios proveedores y comparar costos y servicios ofrecidos.</p>
        <p>4. <strong>Ejecución del Proyecto</strong>: Coordinación de fechas de trabajo y asegurarse de la calidad y satisfacción del trabajo realizado.</p>
      </section>

      <section>
        <p className="text-lg">
          Al planificar cuidadosamente y presupuestar la insonorización, puedes garantizar que el proyecto se realice de manera efectiva y dentro de tu presupuesto.
        </p>
      </section>
    </div>
  );
};

export default InsonorizacionCoste;