'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Eye, EyeOff, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // Mock users for demo
  const mockUsers = [
    { email: 'cliente@demo.com', password: 'Demo123!', role: 'CLIENT', name: 'Juan Cliente', verified: true },
    { email: 'trabajador@demo.com', password: 'Demo123!', role: 'WORKER', name: 'Carlos Electricista', verified: true, kycStatus: 'VERIFIED' },
    { email: 'pendiente@demo.com', password: 'Demo123!', role: 'WORKER', name: 'Maria Plomera', verified: true, kycStatus: 'PENDING_KYC' },
  ]

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validaciones
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos')
      return
    }

    if (!validateEmail(formData.email)) {
      setError('Por favor ingresa un email valido')
      return
    }

    setIsLoading(true)

    // Simular delay de autenticacion
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Buscar usuario mock
    const user = mockUsers.find(u => u.email === formData.email)

    if (!user) {
      setError('El email no esta registrado')
      setIsLoading(false)
      return
    }

    if (user.password !== formData.password) {
      setError('Contrasena incorrecta')
      setIsLoading(false)
      return
    }

    // Redirigir segun rol y estado KYC
    if (user.role === 'WORKER') {
      if (user.kycStatus === 'PENDING_KYC') {
        router.push('/verificacion')
      } else if (user.kycStatus === 'REJECTED') {
        setError('Tu cuenta ha sido rechazada. Contacta soporte.')
        setIsLoading(false)
        return
      } else {
        router.push('/dashboard/trabajador')
      }
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-background">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          {/* Logo */}
          <div className="text-center">
            <Link href="/">
              <Image
                src="/homefix-logo.png"
                alt="HomeFix"
                width={200}
                height={56}
                className="h-14 w-auto mx-auto"
                priority
              />
            </Link>
            <h1 className="mt-8 text-3xl font-bold text-primary">
              Bienvenido de vuelta
            </h1>
            <p className="mt-2 text-muted-foreground">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <Card className="p-6 border border-border shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-11 h-12"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Contrasena
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-accent hover:text-accent/80 font-medium"
                  >
                    Olvidaste tu contrasena?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Tu contrasena"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-11 pr-11 h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Iniciando sesion...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Iniciar Sesion
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>
          </Card>

          {/* Register Link */}
          <p className="text-center text-muted-foreground">
            No tienes una cuenta?{' '}
            <Link href="/register" className="text-accent hover:text-accent/80 font-semibold">
              Registrate aqui
            </Link>
          </p>

          {/* Demo Credentials */}
          <Card className="p-4 bg-secondary/50 border-dashed border-2">
            <p className="text-xs text-muted-foreground font-medium mb-2">Credenciales de prueba:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><span className="font-medium">Cliente:</span> cliente@demo.com / Demo123!</p>
              <p><span className="font-medium">Trabajador:</span> trabajador@demo.com / Demo123!</p>
              <p><span className="font-medium">Pendiente KYC:</span> pendiente@demo.com / Demo123!</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/hero-bg.jpg"
          alt="HomeFix Professional"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/50" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white max-w-md">
            <h2 className="text-4xl font-bold mb-4">
              Tu hogar en las mejores manos
            </h2>
            <p className="text-lg text-white/80">
              Conectamos a mas de 15,000 profesionales verificados con familias que necesitan soluciones confiables.
            </p>
            <div className="mt-8 flex items-center justify-center gap-8">
              <div>
                <p className="text-3xl font-bold">15K+</p>
                <p className="text-sm text-white/70">Profesionales</p>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div>
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-sm text-white/70">Trabajos</p>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div>
                <p className="text-3xl font-bold">4.9</p>
                <p className="text-sm text-white/70">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
