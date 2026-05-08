'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ReviewCard } from '@/components/ReviewCard'
import { reviews } from '@/lib/data/reviews'
import { categories } from '@/lib/data/categories'
import {
  Shield,
  Search,
  MapPin,
  CheckCircle2,
  MessageSquare,
  Star,
  Zap,
  Users,
  ArrowRight,
  BadgeCheck,
  FileCheck,
  Fingerprint,
  Clock,
  Phone,
  Play,
  PhoneCall,
  Calendar,
  Award,
  TrendingUp
} from 'lucide-react'

const stats = [
  { value: '15,000+', label: 'Servicios completados' },
  { value: '2,500+', label: 'Profesionales verificados' },
  { value: '4.9', label: 'Calificacion promedio' },
  { value: '< 30min', label: 'Tiempo de respuesta' },
]

const trustedBy = [
  'Gobierno de la Ciudad',
  'Consejo Profesional',
  'Camara de Comercio',
  'Defensa al Consumidor'
]

export default function Home() {
  const router = useRouter()

  const scrollToSearch = () => {
    router.push('/search')
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Full Width with Strong CTA */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Profesional de HomeFix trabajando"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/98 via-primary/90 to-primary/60 sm:from-primary/95 sm:via-primary/80 sm:to-primary/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="max-w-2xl">
            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 mb-6 sm:mb-8 animate-pulse">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-xs sm:text-sm font-bold text-accent">127 profesionales disponibles ahora</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] sm:leading-[1.1] tracking-tight mb-4 sm:mb-6 text-balance">
              Soluciona el problema de tu hogar{' '}
              <span className="text-accent">hoy mismo</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed max-w-xl">
              Profesionales verificados a domicilio en menos de 2 horas. Sin sorpresas, sin riesgos.
            </p>

            {/* Primary CTA - Large and Prominent */}
            <div className="flex flex-col gap-4 mb-6">
              <Button 
                size="lg" 
                className="h-14 sm:h-16 px-8 sm:px-10 bg-accent hover:bg-accent/90 text-white font-bold text-base sm:text-lg w-full sm:w-auto shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/40 transition-all hover:scale-[1.02]"
                onClick={scrollToSearch}
              >
                Buscar profesional ahora
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
              </Button>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-12 px-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold text-sm sm:text-base"
                  onClick={() => router.push('/diagnostico')}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  No se que necesito
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-12 px-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold text-sm sm:text-base"
                  onClick={() => router.push('/register/trabajador')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Soy profesional
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-white/90">100% Verificados</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-white/90">Respuesta en 30 min</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="text-sm font-medium text-white/90">4.9 estrellas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Bar with Micro CTA */}
      <section className="bg-primary py-6 sm:py-8 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center py-1">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/60 font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                Avalado por
              </p>
              {trustedBy.map((name, idx) => (
                <span key={idx} className="text-sm font-semibold text-muted-foreground/70">
                  {name}
                </span>
              ))}
            </div>
            {/* Inline CTA */}
            <Button 
              size="sm" 
              className="bg-accent hover:bg-accent/90 text-white font-semibold"
              onClick={scrollToSearch}
            >
              Comenzar ahora
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Problem-Solution Section with CTA */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Problem */}
            <div>
              <p className="text-sm font-bold text-destructive uppercase tracking-wider mb-3">El Problema</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6">
                Contratar un tecnico es un riesgo
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  'No sabes quien entra a tu casa',
                  'Precios inflados sin explicacion',
                  'Trabajos mal hechos sin garantia',
                  'Imposible conseguir alguien de confianza'
                ].map((problem, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-destructive text-sm">✕</span>
                    </div>
                    <p className="text-muted-foreground">{problem}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 sm:p-8">
              <p className="text-sm font-bold text-accent uppercase tracking-wider mb-3">La Solucion</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
                HomeFix cambio las reglas
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  'Verificacion de identidad y antecedentes',
                  'Precios transparentes antes de contratar',
                  'Garantia de satisfaccion en cada trabajo',
                  'Reviews reales de clientes verificados'
                ].map((solution, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-foreground font-medium">{solution}</p>
                  </div>
                ))}
              </div>
              <Button 
                size="lg" 
                className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-bold text-base"
                onClick={scrollToSearch}
              >
                Quiero un profesional verificado
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 sm:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider mb-3">Sistema de Confianza</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              Verificacion en 3 niveles
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
              Cada profesional pasa por un proceso exhaustivo antes de poder ofrecer servicios.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {[
              { 
                icon: Fingerprint, 
                level: '1', 
                title: 'Identidad Verificada', 
                desc: 'DNI validado con bases de datos oficiales del gobierno.' 
              },
              { 
                icon: BadgeCheck, 
                level: '2', 
                title: 'Matricula Profesional', 
                desc: 'Habilitaciones y certificaciones tecnicas verificadas.' 
              },
              { 
                icon: FileCheck, 
                level: '3', 
                title: 'Sin Antecedentes', 
                desc: 'Control de antecedentes penales actualizado.' 
              },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 sm:p-8 bg-white/5 border-white/10 text-center hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-accent text-white text-xs font-bold mb-3">
                  NIVEL {item.level}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm sm:text-base">{item.desc}</p>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="h-14 sm:h-16 px-10 bg-accent hover:bg-accent/90 text-white font-bold text-base sm:text-lg shadow-xl"
              onClick={scrollToSearch}
            >
              Ver profesionales verificados
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-white/50 text-sm mt-4">Sin compromiso. Compara perfiles gratis.</p>
          </div>
        </div>
      </section>

      {/* How it Works - Minimal with Strong CTA */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Como Funciona</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
              3 pasos para resolver tu problema
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 mb-12">
            {[
              { num: '1', title: 'Busca', desc: 'Encuentra profesionales por categoria o usa el diagnostico inteligente.' },
              { num: '2', title: 'Compara', desc: 'Revisa perfiles, precios y reviews. Todos verificados.' },
              { num: '3', title: 'Contrata', desc: 'Coordina la visita y recibe servicio de calidad.' },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="h-14 px-8 bg-accent hover:bg-accent/90 text-white font-bold"
              onClick={scrollToSearch}
            >
              Buscar profesional
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-14 px-8 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
              onClick={() => router.push('/diagnostico')}
            >
              <Zap className="w-5 h-5 mr-2" />
              Diagnostico gratuito
            </Button>
          </div>
        </div>
      </section>

      {/* Categories with inline CTAs */}
      <section className="py-16 sm:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-12">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Servicios</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
                Que necesitas resolver?
              </h2>
              <p className="text-muted-foreground">Haz click en una categoria para ver profesionales disponibles</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => router.push(`/search?category=${category.id}`)}
                className="group relative h-40 sm:h-52 md:h-60 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5">
                  <h3 className="font-bold text-white text-sm sm:text-base md:text-lg mb-0.5 drop-shadow-md">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80">{category.count}+ disponibles</p>
                </div>
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-accent transition-colors" />
              </button>
            ))}
          </div>

          {/* Category CTA */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="h-14 px-10 bg-accent hover:bg-accent/90 text-white font-bold"
              onClick={scrollToSearch}
            >
              Ver todos los profesionales
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof - Reviews */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-bold text-accent">4.9 de 5 estrellas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3">
              +15,000 servicios completados
            </h2>
            <p className="text-muted-foreground">Lo que dicen nuestros clientes</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
            {reviews.slice(0, 6).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* CTA after social proof */}
          <div className="text-center bg-accent/5 border border-accent/20 rounded-2xl p-8 sm:p-10">
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">
              Unite a miles de hogares satisfechos
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Encontra al profesional perfecto para tu hogar en minutos.
            </p>
            <Button 
              size="lg" 
              className="h-14 px-10 bg-accent hover:bg-accent/90 text-white font-bold text-base"
              onClick={scrollToSearch}
            >
              Buscar mi profesional
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-12 sm:py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-bold text-accent">127 profesionales online ahora</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Tu problema no puede esperar
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Profesionales verificados listos para ayudarte. Respuesta promedio: 28 minutos.
          </p>
          <Button 
            size="lg" 
            className="h-16 px-12 bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/40 transition-all hover:scale-[1.02]"
            onClick={scrollToSearch}
          >
            Resolver mi problema ahora
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </section>

      {/* Final CTA - Full Width */}
      <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Image
            src="/homefix-logo.png"
            alt="HomeFix"
            width={200}
            height={56}
            className="h-12 w-auto mx-auto mb-8"
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 text-balance">
            El profesional perfecto te esta esperando
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Miles de hogares ya confian en HomeFix. Es tu turno de resolver ese problema que llevas postergando.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="h-16 px-12 bg-accent hover:bg-accent/90 text-white font-bold text-lg"
              onClick={scrollToSearch}
            >
              Buscar profesional
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-16 px-10 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-lg"
              onClick={() => router.push('/register/trabajador')}
            >
              Soy profesional
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
