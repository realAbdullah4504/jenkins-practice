
import Head from 'next/head';

const HumedadesCapilaridadCost = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>¿Cuánto cuesta arreglar humedades por capilaridad? - Handyman</title>
        <meta
          name="description"
          content="Descubre los costos asociados al tratamiento de humedades por capilaridad, incluyendo materiales y mano de obra."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/cuanto-cuesta-humedades-capilaridad`}
        />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">¿Cuánto cuesta arreglar humedades por capilaridad?</h1>

      <section className="mb-8">
        <div className="flex flex-wrap justify-center">
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Materiales: 20€ - 50€/m²</p>
            <p>Incluye los costos de productos químicos, barreras y revestimientos especiales.</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <p className="text-xl font-bold mb-2">Mano de obra: 30€ - 70€/m²</p>
            <p>El costo varía según la complejidad del tratamiento y la experiencia del profesional.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Factores que Afectan los Costos</h2>
        <ul className="list-disc list-inside">
          <li>Extensión y gravedad de las humedades.</li>
          <li>Tipo de pared y material de construcción.</li>
          <li>Técnicas y productos utilizados para el tratamiento.</li>
          <li>Accesibilidad al área afectada.</li>
          <li>Ubicación geográfica.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Costos Promedio para Arreglar Humedades por Capilaridad</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Materiales</strong>: 20€ - 50€/m², dependiendo del tipo y calidad del material utilizado.
          </li>
          <li>
            <strong>Mano de obra</strong>: 30€ - 70€/m², dependiendo de la complejidad del tratamiento y la experiencia del profesional.
          </li>
          <li>
            <strong>Costo Total</strong>: 50€ - 120€/m², combinando materiales y mano de obra.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Consejos para Tratar Humedades por Capilaridad</h2>
        <p>1. <strong>Inspección Profesional</strong>: Realiza una inspección detallada para determinar la causa raíz de las humedades.</p>
        <p>2. <strong>Selección de Materiales</strong>: Escoge productos específicos para humedades por capilaridad, como barreras físicas o químicas.</p>
        <p>3. <strong>Profesional Calificado</strong>: Contrata a un especialista con experiencia en tratamientos de humedades para un resultado efectivo.</p>
        <p>4. <strong>Seguimiento y Mantenimiento</strong>: Realiza un seguimiento periódico y mantenimiento preventivo para evitar futuros problemas de humedad.</p>
      </section>

      <section>
        <p className="text-lg">
          Calcula el presupuesto para tratar humedades por capilaridad considerando todos los factores relevantes y mantén tus paredes protegidas.
        </p>
      </section>
    </div>
  );
};

export default HumedadesCapilaridadCost;
