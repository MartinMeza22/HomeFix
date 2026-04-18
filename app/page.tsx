'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SearchForm } from '@/components/SearchForm'
import { CategoryCard } from '@/components/CategoryCard'
import { ReviewCard } from '@/components/ReviewCard'
import { Button } from '@/components/ui/button'
import { categories } from '@/lib/data/categories'
import { reviews } from '@/lib/data/reviews'

export default function Home() {
  const router = useRouter()

  const handleSearch = (query: string, category: string, location: string) => {
    const params = new URLSearchParams({
      q: query,
      category,
      location
    })
    router.push(`/search?${params.toString()}`)
  }

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/search?category=${categoryId}`)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-transparent py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">
              Encuentra el Profesional Perfecto para tu Reparación
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Conecta con técnicos calificados y verificados. Búsqueda inteligente, diagnóstico asistido por IA, y garantía de satisfacción.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-border">
            <SearchForm
              onSearch={handleSearch}
              categories={categories}
            />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border bg-secondary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">12.5K+</p>
              <p className="text-sm text-muted-foreground">Profesionales Verificados</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">45K+</p>
              <p className="text-sm text-muted-foreground">Trabajos Completados</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">4.8★</p>
              <p className="text-sm text-muted-foreground">Calificación Promedio</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">2h</p>
              <p className="text-sm text-muted-foreground">Respuesta Promedio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Categorías de Servicios
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora todas nuestras categorías de profesionales especializados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onSelect={handleCategorySelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Cómo Funciona
            </h2>
            <p className="text-lg text-muted-foreground">
              Tres pasos simples para resolver tu problema
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Describe tu Problema',
                description: 'Cuéntanos qué necesitas reparar y dónde estás ubicado.',
                icon: '📝'
              },
              {
                number: '02',
                title: 'Recibe Propuestas',
                description: 'Profesionales verificados te enviarán propuestas en minutos.',
                icon: '📨'
              },
              {
                number: '03',
                title: 'Contrata y Resuelve',
                description: 'Elige al mejor profesional y resuelve tu problema.',
                icon: '✅'
              }
            ].map((step, idx) => (
              <div key={idx} className="space-y-4">
                <div className="text-5xl">{step.icon}</div>
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Características Principales
            </h2>
            <p className="text-lg text-muted-foreground">
              Todo lo que necesitas para encontrar el profesional perfecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Búsqueda Inteligente',
                description: 'Encuentra profesionales cerca de ti con filtros avanzados y mapas interactivos.',
                icon: '🔍'
              },
              {
                title: 'Diagnóstico IA',
                description: 'Nuestro sistema de IA te ayuda a identificar exactamente qué servicio necesitas.',
                icon: '🤖'
              },
              {
                title: 'Profesionales Verificados',
                description: 'Todos nuestros técnicos cuentan con verificación de identidad y antecedentes.',
                icon: '✓'
              },
              {
                title: 'Sistema de Reputación',
                description: 'Calificaciones y reviews reales de clientes anteriores. Transparencia total.',
                icon: '⭐'
              },
              {
                title: 'Chat Integrado',
                description: 'Comunícate directamente con los profesionales antes de contratar.',
                icon: '💬'
              },
              {
                title: 'Garantía de Satisfacción',
                description: 'Si no estás satisfecho, tenemos un proceso de resolución de disputas.',
                icon: '🛡️'
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 border border-border rounded-lg space-y-3 hover:border-primary/30 transition-colors">
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Qué Dicen nuestros Clientes
            </h2>
            <p className="text-lg text-muted-foreground">
              Miles de clientes satisfechos confían en OFIX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Comienza Ahora
          </h2>
          <p className="text-lg text-muted-foreground">
            Encuentra el profesional que necesitas en minutos, no en días.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => router.push('/search')}
            >
              Buscar Profesionales
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/diagnostico')}
            >
              Usar Diagnóstico IA
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
