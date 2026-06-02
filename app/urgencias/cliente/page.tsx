'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle,
  Loader2,
  Droplets,
  Zap,
  Flame,
  Lock,
  ChevronRight,
  Star,
  Shield,
  Paintbrush,
  Home,
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react'

// Tipos de urgencia disponibles
const TIPOS_URGENCIA = [
  {
    id: 'plomeria',
    nombre: 'Plomeria',
    icono: Droplets,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200 hover:border-blue-400',
    iconBg: 'bg-blue-100',
    ejemplos: ['Cano roto', 'Perdida de agua', 'Inundacion']
  },
  {
    id: 'electricidad',
    nombre: 'Electricidad',
    icono: Zap,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200 hover:border-amber-400',
    iconBg: 'bg-amber-100',
    ejemplos: ['Corte de luz', 'Cortocircuito', 'Cable chispeando']
  },
  {
    id: 'gas',
    nombre: 'Gas',
    icono: Flame,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200 hover:border-red-400',
    iconBg: 'bg-red-100',
    ejemplos: ['Olor a gas', 'Perdida de gas', 'Calefon roto']
  },
  {
    id: 'cerrajeria',
    nombre: 'Cerrajeria',
    icono: Lock,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200 hover:border-slate-400',
    iconBg: 'bg-slate-100',
    ejemplos: ['Puerta trabada', 'Llave rota', 'Cerradura danada']
  },
  {
    id: 'pintura',
    nombre: 'Pintura',
    icono: Paintbrush,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200 hover:border-purple-400',
    iconBg: 'bg-purple-100',
    ejemplos: ['Filtro en techo', 'Humedad', 'Pintura urgente']
  },
  {
    id: 'techista',
    nombre: 'Techista',
    icono: Home,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200 hover:border-orange-400',
    iconBg: 'bg-orange-100',
    ejemplos: ['Gotera', 'Techo roto', 'Filtracion de lluvia']
  },
  {
    id: 'vidrios',
    nombre: 'Vidrios',
    icono: Layers,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200 hover:border-cyan-400',
    iconBg: 'bg-cyan-100',
    ejemplos: ['Vidrio roto', 'Ventana danada', 'Espejo roto']
  },
  {
    id: 'desinfeccion',
    nombre: 'Desinfeccion',
    icono: Sparkles,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200 hover:border-green-400',
    iconBg: 'bg-green-100',
    ejemplos: ['Plagas', 'Fumigacion', 'Limpieza profunda']
  },
  {
    id: 'otro',
    nombre: 'Otro',
    icono: HelpCircle,
    color: 'text-muted-foreground',
    bgColor: 'bg-muted/40',
    borderColor: 'border-border hover:border-primary/40',
    iconBg: 'bg-muted',
    ejemplos: ['Cualquier otro servicio urgente']
  },
]

// Profesionales disponibles para urgencias (mock)
const PROFESIONALES_URGENCIA = [
  {
    id: '7',
    nombre: 'Pedro Picapiedra',
    categoria: 'Plomeria',
    rating: 4.9,
    reviews: 312,
    distancia: 1.2,
    tiempoLlegada: '15-20 min',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face',
    verificado: true,
    disponible: true
  },
  {
    id: '8',
    nombre: 'Marcelo Gutierrez',
    categoria: 'Plomeria',
    rating: 4.6,
    reviews: 89,
    distancia: 2.8,
    tiempoLlegada: '25-30 min',
    imagen: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&crop=face',
    verificado: true,
    disponible: true
  },
  {
    id: '1',
    nombre: 'Carlos Mendez',
    categoria: 'Electricidad',
    rating: 4.9,
    reviews: 247,
    distancia: 1.5,
    tiempoLlegada: '10-15 min',
    imagen: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop&crop=face',
    verificado: true,
    disponible: true
  }
]

export default function UrgenciasClientePage() {
  const router = useRouter()
  const [step, setStep] = useState<'tipo' | 'descripcion' | 'ubicacion' | 'buscando' | 'profesionales' | 'confirmado'>('tipo')
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string | null>(null)
  const [descripcion, setDescripcion] = useState('')
  const [direccion, setDireccion] = useState('Av. Santa Fe 1234, Palermo, Buenos Aires')
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState<string | null>(null)

  const tipoInfo = TIPOS_URGENCIA.find(t => t.id === tipoSeleccionado)
  const profesionalesFiltrados = PROFESIONALES_URGENCIA.filter(p => 
    tipoInfo ? p.categoria.toLowerCase().includes(tipoSeleccionado!) : true
  )

  const handleSelectTipo = (tipoId: string) => {
    setTipoSeleccionado(tipoId)
    setStep('descripcion')
  }

  const handleContinueDescripcion = () => {
    setStep('ubicacion')
  }

  const handleBuscar = () => {
    setStep('buscando')
    // Simular busqueda
    setTimeout(() => {
      setStep('profesionales')
    }, 2500)
  }

  const handleSelectProfesional = (profId: string) => {
    setProfesionalSeleccionado(profId)
    setStep('confirmado')
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="bg-destructive py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Solicitar Urgencia</h1>
              <div className="flex items-center gap-4 mt-1">
                <span className="flex items-center gap-1.5 text-white/80 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Profesionales disponibles ahora
                </span>
                <span className="text-white/60 text-sm">24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* Step: Seleccionar tipo */}
        {step === 'tipo' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground">Que tipo de urgencia tenes?</h2>
              <p className="text-sm text-muted-foreground mt-1">Selecciona la categoria del problema para encontrar el profesional correcto</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TIPOS_URGENCIA.map((tipo) => {
                const Icon = tipo.icono
                const isOtro = tipo.id === 'otro'
                return (
                  <button
                    key={tipo.id}
                    onClick={() => handleSelectTipo(tipo.id)}
                    className={`
                      group p-4 rounded-2xl border-2 transition-all text-left
                      ${tipo.bgColor} ${tipo.borderColor}
                      ${isOtro ? 'sm:col-span-1' : ''}
                      hover:shadow-md hover:-translate-y-0.5 active:translate-y-0
                    `}
                  >
                    <div className={`w-11 h-11 ${tipo.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${tipo.color}`} />
                    </div>
                    <h3 className={`font-bold text-sm ${isOtro ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {tipo.nombre}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {isOtro ? 'Cualquier servicio urgente que necesites' : tipo.ejemplos.slice(0, 2).join(' · ')}
                    </p>
                    <div className="flex items-center gap-1 mt-3">
                      <span className={`text-xs font-medium ${isOtro ? 'text-muted-foreground' : tipo.color}`}>
                        {isOtro ? 'Ver mas' : 'Solicitar ahora'}
                      </span>
                      <ChevronRight className={`w-3 h-3 ${isOtro ? 'text-muted-foreground' : tipo.color} group-hover:translate-x-0.5 transition-transform`} />
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-6 flex items-center gap-3 p-4 bg-muted/40 rounded-xl border border-border">
              <Shield className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Todos los profesionales estan verificados, asegurados y con antecedentes comprobados.
              </p>
            </div>
          </div>
        )}

        {/* Step: Descripcion */}
        {step === 'descripcion' && tipoInfo && (
          <div className="space-y-4">
            <button 
              onClick={() => setStep('tipo')}
              className="text-sm text-primary hover:underline"
            >
              Volver
            </button>
            
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${tipoInfo.bgColor} flex items-center justify-center`}>
                  <tipoInfo.icono className={`w-5 h-5 ${tipoInfo.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Urgencia de {tipoInfo.nombre}</h3>
                  <p className="text-xs text-muted-foreground">Describe el problema</p>
                </div>
              </div>
              
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ej: Se rompio un cano debajo de la pileta y esta saliendo mucha agua..."
                className="w-full h-28 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground text-sm"
              />
              
              <Button
                onClick={handleContinueDescripcion}
                disabled={descripcion.length < 10}
                className="w-full mt-4 bg-destructive hover:bg-destructive/90"
              >
                Continuar
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>
        )}

        {/* Step: Ubicacion */}
        {step === 'ubicacion' && (
          <div className="space-y-4">
            <button 
              onClick={() => setStep('descripcion')}
              className="text-sm text-primary hover:underline"
            >
              Volver
            </button>
            
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Confirma tu ubicacion</h3>
                  <p className="text-xs text-muted-foreground">Donde necesitas el servicio?</p>
                </div>
              </div>
              
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground text-sm"
              />
              
              <div className="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Tiempo estimado de llegada</p>
                    <p className="text-xs text-amber-700">10-30 minutos dependiendo del profesional</p>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={handleBuscar}
                className="w-full mt-4 bg-destructive hover:bg-destructive/90"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Buscar Profesional Ahora
              </Button>
            </Card>
          </div>
        )}

        {/* Step: Buscando */}
        {step === 'buscando' && (
          <Card className="p-8 text-center">
            <Loader2 className="w-12 h-12 text-destructive mx-auto mb-4 animate-spin" />
            <h2 className="text-lg font-bold text-foreground mb-2">Buscando profesionales cercanos...</h2>
            <p className="text-sm text-muted-foreground">
              Estamos contactando a los profesionales disponibles en tu zona
            </p>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>Verificando disponibilidad</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Calculando tiempos de llegada</span>
              </div>
            </div>
          </Card>
        )}

        {/* Step: Profesionales disponibles */}
        {step === 'profesionales' && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-foreground">Profesionales disponibles</h2>
              <p className="text-sm text-muted-foreground">Selecciona quien queres que atienda tu urgencia</p>
            </div>
            
            <div className="space-y-3">
              {profesionalesFiltrados.map((prof) => (
                <Card 
                  key={prof.id}
                  className="p-4 cursor-pointer hover:border-primary/50 transition-all"
                  onClick={() => handleSelectProfesional(prof.id)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prof.imagen}
                      alt={prof.nombre}
                      className="w-14 h-14 rounded-full object-cover object-top"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-foreground">{prof.nombre}</h3>
                        {prof.verificado && <Shield className="w-4 h-4 text-accent" />}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{prof.rating}</span>
                        <span>({prof.reviews} resenas)</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {prof.distancia} km
                        </span>
                        <span className="text-xs font-medium text-destructive flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {prof.tiempoLlegada}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              ))}
            </div>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              Todos los profesionales estan verificados y disponibles ahora
            </p>
          </div>
        )}

        {/* Step: Confirmado */}
        {step === 'confirmado' && (
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Urgencia confirmada</h2>
            <p className="text-sm text-muted-foreground mb-6">
              El profesional ha sido notificado y esta en camino
            </p>
            
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Tiempo estimado</span>
                <span className="font-bold text-destructive">15-20 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Profesional</span>
                <span className="font-medium text-foreground">Pedro Picapiedra</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.push('/dashboard')}
              >
                Ver en Dashboard
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                <Phone className="w-4 h-4 mr-2" />
                Llamar
              </Button>
            </div>
          </Card>
        )}

      </div>

      <Footer />
    </main>
  )
}
