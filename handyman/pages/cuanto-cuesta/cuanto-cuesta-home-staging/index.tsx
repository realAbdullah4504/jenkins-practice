import Head from 'next/head';

const HomeStagingCoste = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta el home staging? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados con el home staging y cómo puede beneficiar la venta de tu propiedad."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-home-staging`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta el home staging?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Home Staging Básico: 500€ - 2,000€</p>
            <p>Incluye limpieza profunda, reorganización de muebles y decoración básica.</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Home Staging Completo: 2,000€ - 5,000€ o más</p>
            <p>Incluye diseño detallado, alquiler de muebles y decoración personalizada.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que Afectan los Costos</h2>
        <ul className="list-disc list-inside">
          <li>Tamaño y Estado de la Propiedad: Costos pueden variar según el tamaño y condiciones de la propiedad a preparar.</li>
          <li>Nivel de Personalización: Home staging básico versus home staging con diseño y muebles personalizados.</li>
          <li>Ubicación y Mercado Inmobiliario: Precios pueden ser influenciados por la ubicación y demanda en el mercado local.</li>
          <li>Servicios Adicionales: Desde consultoría inicial hasta fotografía profesional para la comercialización.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Precios Promedio para Home Staging</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Home Staging Básico</strong>: 500€ - 2,000€, incluyendo limpieza profunda, reorganización de muebles y decoración básica.
          </li>
          <li>
            <strong>Home Staging Completo</strong>: 2,000€ - 5,000€ o más, incluyendo diseño detallado, alquiler de muebles y decoración personalizada.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Planificación del Presupuesto</h2>
        <p>1. <strong>Evaluación Inicial</strong>: Realiza una evaluación de tu propiedad para determinar las necesidades de home staging.</p>
        <p>2. <strong>Definición de Objetivos</strong>: Establece metas claras sobre cómo deseas presentar la propiedad a potenciales compradores.</p>
        <p>3. <strong>Consultar Profesionales</strong>: Solicita recomendaciones y cotizaciones detalladas de consultores de home staging con experiencia.</p>
        <p>4. <strong>Selección de Servicios</strong>: Selecciona servicios que se ajusten a tu presupuesto y necesidades específicas de preparación de la propiedad.</p>
      </section>

      <section>
        <p className="text-lg">
          Al invertir en home staging, puedes mejorar significativamente la presentación de tu propiedad en el mercado inmobiliario, aumentando así sus posibilidades de venta rápida y al mejor precio posible.
        </p>
      </section>
    </div>
  );
};

export default HomeStagingCoste;