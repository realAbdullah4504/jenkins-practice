import Head from 'next/head';

const CuantoCuestaInstalarAerogeneradores = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta instalar aerogeneradores? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con la instalación de aerogeneradores, incluyendo tipos de aerogeneradores, materiales y cómo calcular el presupuesto para la energía eólica."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-instalar-aerogeneradores`}
        />
      
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">
        ¿Cuánto cuesta instalar aerogeneradores?
      </h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Aerogenerador pequeño: €5,000 - €15,000</p>
            <p>Instalación básica para hogares o pequeñas empresas.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Aerogenerador mediano: €15,000 - €50,000</p>
            <p>Mayor capacidad para suministrar energía a propiedades más grandes.</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Aerogenerador grande: €50,000 - €150,000</p>
            <p>Proyectos industriales o para comunidades que requieren grandes cantidades de energía eólica.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que afectan los costos</h2>
        <ul className="list-disc list-inside">
          <li>Tamaño y capacidad del aerogenerador: Mayor tamaño y capacidad pueden incrementar significativamente los costos.</li>
          <li>Localización y acceso: Costos pueden variar según la accesibilidad al sitio de instalación.</li>
          <li>Preparación del terreno: Necesidad de preparar el terreno para la instalación del aerogenerador.</li>
          <li>Instalación eléctrica: Costos adicionales para conectar el aerogenerador al sistema eléctrico existente.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación de presupuesto</h2>
        <p>1. <strong>Evalúa tus necesidades energéticas</strong>: Determina cuánta energía necesitas y cuánto puede proporcionar un aerogenerador.</p>
        <p>2. <strong>Consulta con instaladores</strong>: Obtén cotizaciones detalladas y consulta sobre los requisitos específicos del proyecto.</p>
        <p>3. <strong>Considera los costos a largo plazo</strong>: Incluye mantenimiento y operación en tu presupuesto inicial.</p>
        <p>4. <strong>Explora opciones de financiamiento</strong>: Investigar incentivos o subvenciones disponibles para energía renovable.</p>
      </section>

      <section>
        <p className="text-lg">
          La instalación de aerogeneradores puede ser una inversión significativa pero rentable a largo plazo para la generación de energía sostenible.
        </p>
      </section>
    </div>
  );
};

export default CuantoCuestaInstalarAerogeneradores;