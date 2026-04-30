'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { categories } from '@/lib/data/categories'
import { 
  Shield, 
  Search, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Star,
  Zap,
  Lock,
  Users,
  ArrowRight,
  BadgeCheck,
  FileCheck,
  Fingerprint
} from 'lucide-react'

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Plataforma de confianza con verificacion triple</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance leading-tight">
              Profesionales verificados.
              <br />
              <span className="text-primary">Seguridad garantizada.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Conectamos personas con tecnicos calificados y verificados. Identidad validada, 
              matriculas profesionales confirmadas y antecedentes verificados.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Que servicio necesitas?" 
                  className="pl-12 h-14 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button 
                size="lg" 
                className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                onClick={() => router.push('/search')}
              >
                Buscar
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Quick category links */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {categories.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => router.push(`/search?category=${cat.id}`)}
                  className="px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '12.500+', label: 'Profesionales Verificados', icon: Users },
              { value: '45.000+', label: 'Trabajos Completados', icon: CheckCircle2 },
              { value: '4.8', label: 'Calificacion Promedio', icon: Star },
              { value: '< 2h', label: 'Tiempo de Respuesta', icon: Zap },
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section - Main differentiator */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <p className="text-sm font-medium text-primary uppercase tracking-wider">Sistema de Confianza</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
              Seguridad en cada paso
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Implementamos un sistema de validacion en tres niveles para garantizar tu tranquilidad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Fingerprint,
                title: 'Validacion de Identidad',
                description: 'DNI verificado con reconocimiento biometrico. Sabemos exactamente quien entra a tu hogar.',
                badge: 'Nivel 1'
              },
              {
                icon: BadgeCheck,
                title: 'Matriculas Profesionales',
                description: 'Verificamos certificaciones y matriculas habilitantes. Solo profesionales capacitados.',
                badge: 'Nivel 2'
              },
              {
                icon: FileCheck,
                title: 'Antecedentes Verificados',
                description: 'Certificado de antecedentes penales actualizado. Seguridad para tu familia.',
                badge: 'Nivel 3'
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {item.badge}
                  </span>
                </div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <p className="text-sm font-medium text-primary uppercase tracking-wider">Como Funciona</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Simple, rapido, seguro
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Describe tu problema',
                description: 'Cuentanos que necesitas o usa nuestro diagnostico asistido por IA para identificar el servicio exacto.',
                icon: Search
              },
              {
                step: '02',
                title: 'Recibe propuestas',
                description: 'Profesionales verificados de tu zona te enviaran propuestas con precios claros en minutos.',
                icon: MessageSquare
              },
              {
                step: '03',
                title: 'Contrata con confianza',
                description: 'Elige al profesional que prefieras basandote en reviews reales y verificaciones.',
                icon: CheckCircle2
              }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-8xl font-bold text-border/50 absolute -top-4 -left-2">{item.step}</div>
                <div className="relative pt-12 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <p className="text-sm font-medium text-primary uppercase tracking-wider">Caracteristicas</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Todo lo que necesitas
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                title: 'Busqueda Geolocalizadad',
                description: 'Encuentra profesionales cerca de ti con filtros avanzados por zona y disponibilidad.'
              },
              {
                icon: Zap,
                title: 'Diagnostico IA',
                description: 'Nuestro sistema inteligente te ayuda a identificar exactamente que servicio necesitas.'
              },
              {
                icon: Shield,
                title: 'Verificacion Triple',
                description: 'Identidad, matriculas y antecedentes. Todos nuestros profesionales estan verificados.'
              },
              {
                icon: Star,
                title: 'Reviews Reales',
                description: 'Sistema de reputacion bidireccional basado en experiencias reales verificadas.'
              },
              {
                icon: MessageSquare,
                title: 'Chat Directo',
                description: 'Comunicacion directa con los profesionales sin intermediarios ni comisiones ocultas.'
              },
              {
                icon: Lock,
                title: 'Sin Comisiones',
                description: 'Modelo freemium sin comisiones para trabajadores. Precios justos y transparentes.'
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="group p-6 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <p className="text-sm font-medium text-primary uppercase tracking-wider">Servicios</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Profesionales especializados
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => router.push(`/search?category=${category.id}`)}
                className="group p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 text-left"
              >
                <span className="text-3xl mb-3 block">{category.icon}</span>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.count}+ profesionales
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-b from-primary/10 to-primary/5 border border-primary/20">
            <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Empieza a buscar con confianza
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Encuentra el profesional que necesitas en minutos. Verificado, calificado y listo para ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                onClick={() => router.push('/search')}
              >
                Buscar Profesionales
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="h-14 px-8"
                onClick={() => router.push('/diagnostico')}
              >
                Usar Diagnostico IA
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
