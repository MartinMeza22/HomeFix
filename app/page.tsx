'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Phone
} from 'lucide-react'

const stats = [
  { value: '15,000+', label: 'Servicios completados', icon: CheckCircle2 },
  { value: '2,500+', label: 'Profesionales verificados', icon: Users },
  { value: '4.9', label: 'Calificacion promedio', icon: Star },
  { value: '< 30min', label: 'Tiempo de respuesta', icon: Clock },
]

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">100% Verificados</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-[1.1] tracking-tight">
                Soluciones para tu hogar,{' '}
                <span className="text-accent">con total confianza</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Conectamos tu hogar con profesionales verificados. Cada tecnico pasa por un riguroso proceso de validacion de identidad, matriculas y antecedentes penales.
              </p>
              
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    placeholder="Que servicio necesitas?" 
                    className="pl-12 h-14 bg-card border-border text-foreground placeholder:text-muted-foreground rounded-lg"
                  />
                </div>
                <Button 
                  size="lg" 
                  className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg"
                  onClick={() => router.push('/search')}
                >
                  Buscar
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">DNI verificado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">Sin antecedentes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">Matriculado</span>
                </div>
              </div>
            </div>
            
            {/* Right - Logo */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                <div className="absolute -inset-8 bg-accent/5 rounded-full blur-3xl" />
                <Image
                  src="/logo.png"
                  alt="HomeFix"
                  width={420}
                  height={420}
                  className="relative drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Sistema de Confianza</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Tu seguridad es nuestra prioridad
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Cada profesional en HomeFix pasa por un proceso de verificacion exhaustivo antes de poder ofrecer sus servicios.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Verification Card 1 */}
            <Card className="p-8 bg-card border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                <Fingerprint className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
                Nivel 1
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Verificacion de Identidad
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Validamos el DNI de cada profesional con bases de datos oficiales. Sabes exactamente quien entrara a tu hogar.
              </p>
            </Card>

            {/* Verification Card 2 */}
            <Card className="p-8 bg-card border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                <BadgeCheck className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
                Nivel 2
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Matriculas Profesionales
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Verificamos las habilitaciones profesionales y certificaciones tecnicas de cada especialidad.
              </p>
            </Card>

            {/* Verification Card 3 */}
            <Card className="p-8 bg-card border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                <FileCheck className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
                Nivel 3
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Control de Antecedentes
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Realizamos verificacion de antecedentes penales para garantizar tu tranquilidad y la de tu familia.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Como Funciona</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Simple, rapido y seguro
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Tres pasos simples para resolver cualquier problema en tu hogar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Describe tu problema
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Usa nuestro diagnostico asistido o busca directamente el tipo de servicio que necesitas.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Elige un profesional
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Compara perfiles, reviews y disponibilidad. Todos nuestros profesionales estan verificados.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-2xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Problema resuelto
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Coordina la visita, recibe el servicio y califica tu experiencia para ayudar a otros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Servicios</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                Profesionales especializados
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Encuentra expertos verificados en las categorias mas demandadas
              </p>
            </div>
            <Link href="/search" className="mt-6 md:mt-0">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                Ver todos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => router.push(`/search?category=${category.id}`)}
                className="group p-6 rounded-xl bg-card border border-border hover:border-accent hover:shadow-lg transition-all duration-300 text-left"
              >
                <span className="text-3xl mb-4 block">{category.icon}</span>
                <h3 className="font-bold text-primary group-hover:text-accent transition-colors mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.count}+ profesionales
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Caracteristicas</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Todo lo que necesitas
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                title: 'Busqueda Geolocalizada',
                description: 'Encuentra profesionales cerca de ti con filtros avanzados por zona y disponibilidad.'
              },
              {
                icon: Zap,
                title: 'Diagnostico Asistido',
                description: 'Nuestro sistema inteligente te ayuda a identificar exactamente que servicio necesitas.'
              },
              {
                icon: Shield,
                title: 'Verificacion Triple',
                description: 'Identidad, matriculas y antecedentes. Todos nuestros profesionales estan verificados.'
              },
              {
                icon: Star,
                title: 'Reviews Verificados',
                description: 'Sistema de reputacion basado en experiencias reales de usuarios verificados.'
              },
              {
                icon: MessageSquare,
                title: 'Chat Directo',
                description: 'Comunicacion directa con los profesionales sin intermediarios ni comisiones ocultas.'
              },
              {
                icon: Phone,
                title: 'Soporte 24/7',
                description: 'Equipo de soporte disponible para ayudarte en cualquier momento del dia.'
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="group p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-semibold text-accent">4.9 de calificacion promedio</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Miles de hogares ya confian en HomeFix para sus reparaciones
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Resuelve tu problema hoy mismo
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Conecta con profesionales verificados cerca de ti. Rapido, seguro y con garantia de satisfaccion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              onClick={() => router.push('/search')}
            >
              Buscar profesional
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
              onClick={() => router.push('/diagnostico')}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Diagnostico gratuito
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
