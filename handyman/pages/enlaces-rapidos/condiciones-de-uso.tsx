import type { NextPage } from 'next'
import Head from 'next/head'

const Terms: NextPage = () => {
  return (
    <>
      <Head>
        <title>Términos de Uso</title>
        <meta name="description" content="Términos de uso de la plataforma" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Términos de Uso</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">1. Introducción</h2>
          <p>
            {`Bienvenido a [Nombre de tu Empresa] (la "Plataforma"). Estos Términos de Uso ("Términos") regulan tu acceso y uso de nuestro sitio web y servicios. Al acceder o utilizar la Plataforma, aceptas cumplir y estar sujeto a estos Términos, así como a nuestra Política de Privacidad, que se incorpora por referencia. Si no estás de acuerdo con estos Términos, por favor, no utilices la Plataforma.`}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">2. Definiciones</h2>
          <ul className="list-disc ml-6">
            <li><strong>{`"Usuario"`}</strong>: Cualquier individuo o entidad que acceda a la Plataforma, incluidos Clientes y Profesionales.</li>
            <li><strong>{`"Cliente`}</strong>: Un Usuario que publica un trabajo o solicitud de proyecto en la Plataforma.</li>
            <li><strong>{`"Profesional`}</strong>: Un Usuario que ofrece servicios a través de la Plataforma.</li>
            <li><strong>{`"Servicios`}</strong>: Los servicios proporcionados por la Plataforma para facilitar conexiones entre Clientes y Profesionales.</li>
          </ul>
        </section>

        {/* Füge die weiteren Abschnitte hier hinzu */}

        <section className="mb-6">
          <h2 className="text-xl font-semibold">16. Información de Contacto</h2>
          <p>
            Si tienes alguna pregunta o inquietud acerca de estos Términos, por favor contacta con nosotros en:
          </p>
          <ul className="list-disc ml-6">
            <li><strong>Correo Electrónico:</strong> [Tu Correo Electrónico de Contacto]</li>
            <li><strong>Teléfono:</strong> [Tu Número de Teléfono de Contacto]</li>
            <li><strong>Dirección Postal:</strong> [Dirección de tu Empresa]</li>
          </ul>
        </section>
      </main>
    </>
  )
}

export default Terms
