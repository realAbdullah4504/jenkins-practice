import Head from 'next/head';

const AcerasCosto = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta instalar aceras? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con la instalación de aceras en tu propiedad y cómo planificar tu presupuesto para este tipo de proyecto."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-instalar-aceras`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta instalar aceras?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Instalación Básica: 20€ - 50€ por metro lineal</p>
            <p>Precio estimado para aceras estándar con materiales básicos y mano de obra.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Instalación Compleja: 50€ - 100€ por metro lineal</p>
            <p>Precio más alto para aceras que requieren materiales especiales o preparación del terreno.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que Afectan los Costos</h2>
        <ul className="list-disc list-inside">
          <li>Tamaño y Longitud: La longitud total de la acera y su ancho.</li>
          <li>Materiales Utilizados: Costos varían según el tipo de material usado, como concreto, adoquines, etc.</li>
          <li>Preparación del Terreno: Si se requiere nivelación del suelo o remoción de pavimento existente.</li>
          <li>Accesibilidad y Ubicación: Dificultades de acceso o ubicación que puedan afectar el costo del transporte de materiales.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Precios Promedio para Instalar Aceras</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Instalación Básica</strong>: 20€ - 50€ por metro lineal, incluyendo materiales básicos y mano de obra.
          </li>
          <li>
            <strong>Instalación Compleja</strong>: 50€ - 100€ por metro lineal, para proyectos más grandes o complicados.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación del Presupuesto</h2>
        <p>1. <strong>Evaluación del Proyecto</strong>: Determinar la longitud y tipo de acera requerida.</p>
        <p>2. <strong>Solicitar Múltiples Presupuestos</strong>: Obtener cotizaciones de varios contratistas para comparar precios y servicios.</p>
        <p>3. <strong>Considerar Costos Adicionales</strong>: Incluir un margen para imprevistos durante la instalación.</p>
        <p>4. <strong>Calidad y Garantía</strong>: Verificar la calidad de los materiales y la garantía ofrecida por el contratista.</p>
      </section>

      <section>
        <p className="text-lg">
          Al planificar la instalación de aceras, es importante considerar todos los factores involucrados para garantizar un proyecto exitoso dentro del presupuesto establecido.
        </p>
      </section>
    </div>
  );
};

export default AcerasCosto;