import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FC } from 'react'

const OurStory: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nuestra Historia</title>
        <meta name="description" content="Nuestra historia comienza con la visión de conectar a artesanos y clientes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Nuestra Historia</h1>
        <p className="text-lg text-gray-700">
          Nuestra historia comienza con la visión de conectar a artesanos y clientes en una plataforma que ofrezca confianza, calidad y fiabilidad.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          Creamos nuestro portal de oficios para facilitar la búsqueda de los mejores profesionales y, al mismo tiempo, brindarles a los artesanos la oportunidad de ofrecer sus servicios a un amplio público.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          Nuestro objetivo es cerrar la brecha entre la demanda y la oferta en el sector de oficios, generando una situación beneficiosa para todas las partes involucradas.
        </p>
      </main>
    </>
  )
}

export default OurStory
