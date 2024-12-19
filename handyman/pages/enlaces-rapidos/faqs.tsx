// pages/faq.tsx
import type { NextPage } from 'next'
import Head from 'next/head'
import { FC } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: '¿Cómo solicitar un presupuesto?',
    answer: 'Para solicitar un presupuesto, dirígete a la sección de "Solicitar Presupuesto" y completa el formulario con la información requerida.',
  },
  {
    question: '¿Cómo publicar un proyecto?',
    answer: 'Puedes publicar un proyecto accediendo a la sección de "Publicar Proyecto" y siguiendo las instrucciones allí indicadas.',
  },
  {
    question: '¿Cómo contratar a un profesional?',
    answer: 'Para contratar a un profesional, visita la sección de "Contratar Profesional", elige el profesional adecuado y sigue el proceso de contratación.',
  },
  // Füge hier weitere FAQ-Items hinzu
]

const FAQPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>FAQs</title>
        <meta name="description" content="Preguntas frecuentes sobre el uso del portal de oficios." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-6">Preguntas Frecuentes</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{faq.question}</h2>
              <p className="mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default FAQPage
