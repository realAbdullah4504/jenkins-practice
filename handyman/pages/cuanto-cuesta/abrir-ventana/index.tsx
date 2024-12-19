import Head from 'next/head';

const AbrirVentana = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta abrir una ventana? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con la apertura de ventanas y cómo planificar tu presupuesto para este proyecto."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/abrir-ventana`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta abrir una ventana?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Apertura Básica: 100€ - 300€</p>
            <p>Incluye la creación de la abertura y colocación de una ventana estándar.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Apertura Personalizada: 300€ - 1000€</p>
            <p>Incluye diseño personalizado, materiales de alta calidad y ventanas especiales.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que Afectan los Costos</h2>
        <ul className="list-disc list-inside">
          <li>Tamaño de la Ventana: Dimensiones de la abertura requerida.</li>
          <li>Tipo de Ventana: Ventanas estándar o especiales (como de doble cristal o con características especiales).</li>
          <li>Ubicación: Acceso y dificultad para la instalación.</li>
          <li>Materiales y Acabados: Costo de los materiales utilizados en la apertura y acabados.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Precios Promedio para Abrir una Ventana</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Apertura Básica</strong>: 100€ - 300€, incluyendo la creación de la abertura y colocación de una ventana estándar.
          </li>
          <li>
            <strong>Apertura Personalizada</strong>: 300€ - 1000€, incluyendo diseño personalizado, materiales de alta calidad y ventanas especiales.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación del Presupuesto</h2>
        <p>1. <strong>Mediciones y Diseño</strong>: Determina el tamaño exacto y diseño de la ventana.</p>
        <p>2. <strong>Selección de Materiales</strong>: Elige materiales que se ajusten a tu presupuesto y necesidades.</p>
        <p>3. <strong>Obtención de Cotizaciones</strong>: Solicita presupuestos detallados a varios proveedores para comparar precios.</p>
        <p>4. <strong>Consideración de Mano de Obra</strong>: Asegúrate de incluir costos laborales en tu presupuesto final.</p>
      </section>

      <section>
        <p className="text-lg">
          Abrir una ventana puede mejorar la luz natural y ventilación de tu espacio, asegúrate de planificar adecuadamente para obtener resultados satisfactorios dentro de tu presupuesto.
        </p>
      </section>
    </div>
  );
};

export default AbrirVentana;
