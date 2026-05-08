'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Briefcase, User, Shield, CheckCircle, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()

  const roles = [
    {
      id: 'cliente',
      title: 'Soy Cliente',
      description: 'Busco profesionales para reparaciones y servicios en mi hogar',
      icon: User,
      features: [
        'Publica trabajos y recibe cotizaciones',
        'Accede a profesionales verificados',
        'Sistema de pagos seguro',
        'Califica y deja resenas'
      ],
      href: '/register/cliente',
      color: 'accent'
    },
    {
      id: 'trabajador',
      title: 'Soy Profesional',
      description: 'Ofrezco mis servicios de reparacion y mantenimiento',
      icon: Briefcase,
      features: [
        'Recibe solicitudes de trabajo',
        'Construye tu reputacion',
        'Verificacion de identidad',
        'Cobranza simplificada'
      ],
      href: '/register/trabajador',
      color: 'primary'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b border-border py-4 px-6">
        <Link href="/">
          <Image
            src="/homefix-logo.png"
            alt="HomeFix"
            width={160}
            height={44}
            className="h-10 w-auto"
            priority
          />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-4xl w-full space-y-6 sm:space-y-8">
          {/* Title */}
          <div className="text-center space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary text-balance">
              Crea tu cuenta en HomeFix
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Selecciona el tipo de cuenta que mejor se adapte a tus necesidades
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <Card
                  key={role.id}
                  onClick={() => router.push(role.href)}
                  className={`p-5 sm:p-8 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 hover:border-${role.color} group relative overflow-hidden`}
                >
                  {/* Background Accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${role.color}/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`} />
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-${role.color}/10 flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 text-${role.color}`} />
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    {role.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {role.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-foreground">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className={`flex items-center gap-2 text-${role.color} font-semibold group-hover:gap-3 transition-all`}>
                    <span>Registrarme como {role.id}</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Shield className="w-5 h-5" />
            <span className="text-sm">
              Tus datos estan protegidos con encriptacion de grado bancario
            </span>
          </div>

          {/* Login Link */}
          <p className="text-center text-muted-foreground">
            Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-accent hover:text-accent/80 font-semibold">
              Inicia sesion
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
