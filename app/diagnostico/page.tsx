'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { DiagnosticoWizard } from '@/components/DiagnosticoWizard'
import { Card } from '@/components/ui/card'

export default function DiagnosticoPage() {
  const router = useRouter()
  const [diagnosis, setDiagnosis] = useState<any>(null)

  const handleDiagnosisComplete = (result: any) => {
    setDiagnosis(result)
    // Redirect to search with diagnosis params
    setTimeout(() => {
      router.push(`/search?category=${result.category}&location=${result.location}`)
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Diagnóstico Inteligente
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Responde algunas preguntas simples y nuestro sistema de IA te conectará con el profesional perfecto para tu problema.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: 'Rápido',
              description: 'Solo 2 minutos para completar el diagnóstico',
              icon: '⚡'
            },
            {
              title: 'Preciso',
              description: 'Tecnología IA para identificar exactamente qué necesitas',
              icon: '🎯'
            },
            {
              title: 'Personalizado',
              description: 'Recomendaciones basadas en tu ubicación y urgencia',
              icon: '⭐'
            }
          ].map((card, idx) => (
            <Card key={idx} className="p-6 text-center space-y-3">
              <div className="text-4xl">{card.icon}</div>
              <h3 className="font-bold text-lg text-foreground">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </Card>
          ))}
        </div>

        {/* Wizard */}
        <div className="bg-white border border-border rounded-xl p-8 md:p-12 mb-16">
          <DiagnosticoWizard onComplete={handleDiagnosisComplete} />
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-foreground text-center">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-4">
            {[
              {
                q: '¿Cómo funciona el diagnóstico de IA?',
                a: 'Nuestro sistema analiza tus respuestas para identificar exactamente qué tipo de profesional necesitas. Usa machine learning para conectarte con los mejores especialistas.'
              },
              {
                q: '¿Es realmente gratis?',
                a: 'Sí, el diagnóstico es completamente gratis. Solo pagas cuando contratas a un profesional.'
              },
              {
                q: '¿Cuánto tarda en responder un profesional?',
                a: 'El tiempo promedio de respuesta es de 2 horas. Algunos profesionales responden en minutos, especialmente si la solicitud es urgente.'
              },
              {
                q: '¿Qué pasa si no estoy satisfecho?',
                a: 'Tenemos un proceso completo de resolución de disputas. Si el trabajo no cumple con tus expectativas, podemos ayudarte a resolverlo.'
              },
              {
                q: '¿Puedo cambiar de profesional después de contratarlo?',
                a: 'Sí, si algo no sale como planeaste, puedes comunicarte con soporte para cambiar de profesional.'
              }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 space-y-3 cursor-pointer hover:border-primary/30 transition-colors">
                <h3 className="font-bold text-foreground">{item.q}</h3>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
