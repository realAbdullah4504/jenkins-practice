// pages/ayuda.tsx
import type { NextPage } from 'next'
import Head from 'next/head'

const Ayuda: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Centro de Ayuda</title>
        <meta name="description" content="Centro de Ayuda para nuestra plataforma" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900">¡Bienvenido al Centro de Ayuda!</h1>
        <p className="mt-4 text-lg text-gray-700">
          Aquí encontrarás guías y soporte detallados sobre todos los aspectos de nuestra plataforma. Ya sea que necesites ayuda con el registro, la asignación de trabajos o problemas técnicos, nuestro Centro de Ayuda te proporciona instrucciones detalladas y respuestas a tus preguntas.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Secciones de Ayuda</h2>
          <ul className="mt-4 space-y-4">
            <li className="p-4 bg-white shadow rounded">
              <h3 className="text-xl font-medium text-gray-900">Registro</h3>
              <p className="text-gray-600">Instrucciones sobre cómo registrarte en nuestra plataforma.</p>
            </li>
            <li className="p-4 bg-white shadow rounded">
              <h3 className="text-xl font-medium text-gray-900">Asignación de Trabajos</h3>
              <p className="text-gray-600">Cómo asignar trabajos y gestionar tu carga laboral.</p>
            </li>
            <li className="p-4 bg-white shadow rounded">
              <h3 className="text-xl font-medium text-gray-900">Problemas Técnicos</h3>
              <p className="text-gray-600">Solución de problemas técnicos comunes.</p>
            </li>
          </ul>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        <p>&copy; 2024 Centro de Ayuda</p>
      </footer>
    </div>
  )
}

export default Ayuda
