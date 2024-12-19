import Head from 'next/head';

const PozoCoste = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta hacer un pozo? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con la creación de un pozo y cómo planificar tu presupuesto para esta tarea."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-hacer-un-pozo`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta hacer un pozo?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Pozo Sencillo: 1000€ - 3000€</p>
            <p>Incluye excavación básica y materiales estándar.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Pozo Profundo: 5000€ - 10000€</p>
            <p>Incluye excavación profunda y uso de bombas de agua.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que Afectan los Costos</h2>
        <ul className="list-disc list-inside">
          <li>Profundidad del Pozo: La profundidad afecta directamente el costo de la excavación y el uso de equipos.</li>
          <li>Tipología del Suelo: Algunos suelos pueden requerir técnicas especiales o materiales adicionales.</li>
          <li>Accesibilidad: Dificultad para acceder al sitio de excavación puede incrementar los costos.</li>
          <li>Equipo Necesario: Uso de bombas, filtros y otros equipos afecta el presupuesto total.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Precios Promedio para Hacer un Pozo</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Pozo Sencillo</strong>: 1000€ - 3000€, incluyendo excavación básica y materiales estándar.
          </li>
          <li>
            <strong>Pozo Profundo</strong>: 5000€ - 10000€, incluyendo excavación profunda y uso de bombas de agua.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación del Presupuesto</h2>
        <p>1. <strong>Evaluación de las Necesidades del Pozo</strong>: Determina la profundidad requerida y otros requisitos específicos.</p>
        <p>2. <strong>Investigación y Comparación</strong>: Obtén presupuestos detallados de varias empresas de excavación para comparar precios y métodos.</p>
        <p>3. <strong>Considerar Beneficios a Largo Plazo</strong>: Invierte en materiales de alta calidad y técnicas adecuadas para asegurar un pozo duradero y eficiente.</p>
        <p>4. <strong>Calidad y Fiabilidad</strong>: Elige profesionales con experiencia en la construcción de pozos para garantizar un trabajo bien hecho y cumplir con las normativas locales.</p>
      </section>

      <section>
        <p className="text-lg">
          Al planificar y presupuestar cuidadosamente la creación de un pozo, puedes obtener una fuente de agua confiable que satisfaga tus necesidades de forma efectiva y eficiente.
        </p>
      </section>
    </div>
  );
};

export default PozoCoste;