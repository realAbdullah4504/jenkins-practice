import Head from 'next/head';

const CuantoCuestaInstalacionTejados = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta la instalación de tejados? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costes asociados con la instalación de tejados y cómo presupuestar adecuadamente para proyectos de renovación o construcción."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-instalacion-tejados`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta la instalación de tejados?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Tejas estándar: €30 - €50 por metro cuadrado</p>
            <p>Incluye materiales y mano de obra básica.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Tejas premium: €50 - €100+ por metro cuadrado</p>
            <p>Para tejas especiales o diseños personalizados.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que afectan los costos</h2>
        <ul className="list-disc list-inside">
          <li>Tipo de material de techo: Tejas, tejas asfálticas, techo de metal, etc.</li>
          <li>Área y tamaño del techo: Tamaño total del área a cubrir.</li>
          <li>Complejidad de la estructura del techo: Pendientes, formas especiales, accesibilidad, etc.</li>
          <li>Ubicación geográfica: Costos pueden variar según la región y disponibilidad de materiales.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Presupuesto y planificación</h2>
        <p>1. <strong>Evaluación inicial</strong>: Inspeccionar el techo actual y determinar requisitos.</p>
        <p>2. <strong>Solicitar cotizaciones</strong>: Obtener presupuestos detallados de contratistas de tejados.</p>
        <p>3. <strong>Selección de materiales</strong>: Elegir materiales de acuerdo al presupuesto y preferencias estéticas.</p>
        <p>4. <strong>Coordinación de la instalación</strong>: Programar la instalación con el contratista seleccionado.</p>
      </section>

      <section>
        <p className="text-lg">
          La instalación adecuada del tejado puede mejorar la eficiencia energética y proteger tu hogar a largo plazo.
        </p>
      </section>
    </div>
  );
};

export default CuantoCuestaInstalacionTejados;
