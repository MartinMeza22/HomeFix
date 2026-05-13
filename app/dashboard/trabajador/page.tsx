'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Briefcase, 
  Star, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  MessageSquare,
  User,
  Shield,
  ChevronRight,
  Eye,
  Send,
  FileText
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

// Mock trabajador data (simulando sesion)
const mockTrabajador = {
  id: '7',
  name: 'Pedro Picapiedra',
  email: 'pedro.picapiedra@demo.com',
  category: 'Plomero',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face',
  rating: 4.9,
  reviews: 312,
  location: 'Recoleta, Buenos Aires',
  verified: true,
  memberSince: 'Mayo 2018',
  completedJobs: 847,
  responseRate: 99,
  disponibleUrgencia: true,
  validaciones: {
    dni: true,
    antecedentes: true,
    matricula: true,
    domicilio: false
  }
}

// Mock trabajos disponibles
const mockTrabajosDisponibles = [
  {
    id: '1',
    titulo: 'Reparacion de canilla que gotea',
    descripcion: 'La canilla de la cocina gotea constantemente. Necesito que la reparen o cambien.',
    categoria: 'Plomería',
    ubicacion: 'Recoleta, Buenos Aires',
    distancia: 1.8,
    urgencia: 'media',
    fechaPublicacion: '2026-05-08',
    cliente: 'Marta Ocampo'
  },
  {
    id: '2',
    titulo: 'Destape de cañeria en baño',
    descripcion: 'El desague de la ducha esta tapado, el agua no baja. Necesito solucion urgente.',
    categoria: 'Plomería',
    ubicacion: 'Belgrano, Buenos Aires',
    distancia: 2.5,
    urgencia: 'alta',
    fechaPublicacion: '2026-05-09',
    cliente: 'Juan P.'
  },
  {
    id: '3',
    titulo: 'Instalacion de calefon nuevo',
    descripcion: 'Compre un calefon nuevo y necesito instalarlo. Tengo todos los materiales.',
    categoria: 'Plomería',
    ubicacion: 'Villa Crespo, Buenos Aires',
    distancia: 3.1,
    urgencia: 'baja',
    fechaPublicacion: '2026-05-07',
    cliente: 'Laura M.'
  }
]

// Mock postulaciones
const mockPostulaciones = [
  {
    id: '1',
    trabajo: 'Reparacion de tuberia en cocina',
    cliente: 'Marta Ocampo',
    estado: 'pendiente',
    fechaPostulacion: '2026-05-08'
  },
  {
    id: '2',
    trabajo: 'Cambio de griferia completa en baño',
    cliente: 'Ana K.',
    estado: 'aceptada',
    fechaPostulacion: '2026-05-06'
  }
]

// Mock urgencias entrantes
const mockUrgencias = [
  {
    id: 'urg-1',
    tipo: 'Caño roto',
    descripcion: 'Se rompio un caño debajo de la pileta de la cocina, esta inundando todo. ¡Urgente!',
    cliente: 'Maria Gomez',
    ubicacion: 'Palermo, Buenos Aires',
    distancia: 1.2,
    hora: 'Hace 3 min',
    estado: 'pendiente' as const
  },
  {
    id: 'urg-2',
    tipo: 'Perdida de agua',
    descripcion: 'Hay una perdida grande en el baño, el agua no para de salir del inodoro.',
    cliente: 'Roberto Perez',
    ubicacion: 'Villa Crespo, Buenos Aires',
    distancia: 2.4,
    hora: 'Hace 8 min',
    estado: 'pendiente' as const
  },
  {
    id: 'urg-3',
    tipo: 'Cañeria tapada',
    descripcion: 'Se tapo la cañeria principal, todos los desagues del depto estan colapsados.',
    cliente: 'Laura Sanchez',
    ubicacion: 'Recoleta, Buenos Aires',
    distancia: 3.1,
    hora: 'Hace 15 min',
    estado: 'pendiente' as const
  }
]

// Mock citas proximas
const mockCitas = [
  {
    id: '1',
    cliente: 'Sofia Martinez',
    servicio: 'Reparacion de canilla',
    fecha: '2026-05-10',
    hora: '10:00',
    ubicacion: 'Belgrano, Buenos Aires'
  },
  {
    id: '2',
    cliente: 'Carlos Gonzalez',
    servicio: 'Destape de cañeria',
    fecha: '2026-05-11',
    hora: '14:30',
    ubicacion: 'Palermo, Buenos Aires'
  }
]

export default function TrabajadorDashboard() {
  const router = useRouter()
  const [trabajador] = useState(mockTrabajador)
  const [disponibleUrgencia, setDisponibleUrgencia] = useState(mockTrabajador.disponibleUrgencia)
  const [urgencias, setUrgencias] = useState(mockUrgencias)

  const handleUrgenciaAction = (urgenciaId: string, action: 'aceptar' | 'rechazar') => {
    setUrgencias(prev => prev.filter(u => u.id !== urgenciaId))
    
    if (action === 'aceptar') {
      // Aquí se integraría con backend para notificar al cliente
      console.log('[v0] Urgencia aceptada:', urgenciaId)
    } else {
      console.log('[v0] Urgencia rechazada:', urgenciaId)
    }
  }

  const validacionesCompletadas = Object.values(trabajador.validaciones).filter(Boolean).length
  const totalValidaciones = Object.keys(trabajador.validaciones).length

  const getUrgenciaBadge = (urgencia: string) => {
    switch (urgencia) {
      case 'alta':
        return <Badge className="bg-red-500/10 text-red-600 border-0">Urgente</Badge>
      case 'media':
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-0">Normal</Badge>
      default:
        return <Badge className="bg-green-500/10 text-green-600 border-0">Flexible</Badge>
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-0">Pendiente</Badge>
      case 'aceptada':
        return <Badge variant="secondary" className="bg-accent/10 text-accent border-0">Aceptada</Badge>
      case 'rechazada':
        return <Badge variant="secondary" className="bg-red-500/10 text-red-600 border-0">Rechazada</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#D9D9D9' }}>
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Profile Image */}
              <div className="relative">
                <Image
                  src={trabajador.image}
                  alt={trabajador.name}
                  width={100}
                  height={100}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border-4 border-white/20"
                />
                {trabajador.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center border-2 border-primary">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">Hola, {trabajador.name.split(' ')[0]}</h1>
                  {trabajador.verified && (
                    <Badge className="bg-accent text-white border-0 flex items-center gap-1.5 w-fit px-2 py-0.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Verificado
                    </Badge>
                  )}
                </div>
                <p className="text-white/70 mb-2">{trabajador.category} - {trabajador.location}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-white/80">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-semibold">{trabajador.rating}</span>
                    <span className="text-white/60">({trabajador.reviews} reseñas)</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/60">
                    <Briefcase className="w-4 h-4" />
                    <span>{trabajador.completedJobs} trabajos</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => router.push('/trabajador/perfil')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Mi Perfil
                </Button>
                <Button
                  className="flex-1 sm:flex-none bg-accent hover:bg-accent/90 text-white"
                  onClick={() => router.push('/trabajador/trabajos')}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Ver Trabajos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-primary/95 border-t border-white/10 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Trabajos Nuevos', value: mockTrabajosDisponibles.length, icon: Briefcase, color: 'text-accent' },
                { label: 'Postulaciones', value: mockPostulaciones.length, icon: Send, color: 'text-blue-400' },
                { label: 'Citas Próximas', value: mockCitas.length, icon: Calendar, color: 'text-yellow-400' },
                { label: 'Tasa Respuesta', value: `${trabajador.responseRate}%`, icon: TrendingUp, color: 'text-green-400' }
              ].map((stat, idx) => (
                <Card key={idx} className="bg-white/5 border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white/10 ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-white/60">{stat.label}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Urgencias Entrantes - Full Width Section (Oculto para el MVP) */}

        {/* Main Content */}
        <section className="py-8 sm:py-12">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Trabajos y Postulaciones */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Trabajos Disponibles */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground">Trabajos en tu zona</h2>
                    <Button variant="ghost" size="sm" onClick={() => router.push('/trabajador/trabajos')}>
                      Ver todos
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {mockTrabajosDisponibles.slice(0, 3).map((trabajo) => (
                      <Card 
                        key={trabajo.id} 
                        className="p-4 hover:shadow-lg transition-shadow cursor-pointer border-border/50"
                        onClick={() => router.push(`/trabajador/trabajos?id=${trabajo.id}`)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {getUrgenciaBadge(trabajo.urgencia)}
                              <span className="text-xs text-muted-foreground">{trabajo.fechaPublicacion}</span>
                            </div>
                            <h3 className="font-semibold text-foreground truncate">{trabajo.titulo}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{trabajo.descripcion}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {trabajo.ubicacion}
                              </span>
                              <span>{trabajo.distancia} km</span>
                            </div>
                          </div>
                          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white flex-shrink-0">
                            <Eye className="w-4 h-4 mr-1" />
                            Ver
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Mis Postulaciones Recientes */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground">Mis Postulaciones</h2>
                    <Button variant="ghost" size="sm" onClick={() => router.push('/trabajador/mis-postulaciones')}>
                      Ver todas
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {mockPostulaciones.map((post) => (
                      <Card key={post.id} className="p-4 border-border/50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">{post.trabajo}</h3>
                            <p className="text-sm text-muted-foreground">Cliente: {post.cliente}</p>
                          </div>
                          <div className="text-right">
                            {getEstadoBadge(post.estado)}
                            <p className="text-xs text-muted-foreground mt-1">{post.fechaPostulacion}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Próximas Citas */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground">Próximas Citas</h2>
                  </div>
                  
                  {mockCitas.length > 0 ? (
                    <div className="space-y-3">
                      {mockCitas.map((cita) => (
                        <Card key={cita.id} className="p-4 border-l-4 border-l-accent border-border/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-foreground">{cita.servicio}</h3>
                              <p className="text-sm text-muted-foreground">Cliente: {cita.cliente}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3" />
                                {cita.ubicacion}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary">{cita.fecha}</p>
                              <p className="text-sm text-muted-foreground">{cita.hora}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-8 text-center border-border/50">
                      <Calendar className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">No tenés citas próximas</p>
                    </Card>
                  )}
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                
                {/* Validaciones */}
                <Card className="p-6 border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Mis Validaciones
                    </h3>
                    <span className="text-sm font-semibold text-accent">{validacionesCompletadas}/{totalValidaciones}</span>
                  </div>
                  
                  <div className="space-y-3">
                    {Object.entries(trabajador.validaciones).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-foreground capitalize">{key.replace('_', ' ')}</span>
                        {value ? (
                          <CheckCircle className="w-5 h-5 text-accent" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                    ))}
                  </div>

                  {validacionesCompletadas < totalValidaciones && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 border-accent text-accent hover:bg-accent/10"
                      onClick={() => router.push('/trabajador/validaciones')}
                    >
                      Completar Validaciones
                    </Button>
                  )}
                </Card>

                {/* Accesos Rápidos */}
                <Card className="p-6 border-border/50">
                  <h3 className="font-bold text-foreground mb-4">Accesos Rápidos</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Buscar Trabajos', href: '/trabajador/trabajos', icon: Briefcase },
                      { label: 'Mi Perfil', href: '/trabajador/perfil', icon: User },
                      { label: 'Mis Validaciones', href: '/trabajador/validaciones', icon: Shield },
                      { label: 'Mis Postulaciones', href: '/trabajador/mis-postulaciones', icon: FileText },
                      { label: 'Mensajes', href: '/trabajador/mensajes', icon: MessageSquare },
                    ].map((item) => (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:text-foreground"
                        onClick={() => router.push(item.href)}
                      >
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </Card>

                {/* Tips */}
                <Card className="p-6 bg-accent/5 border-accent/20">
                  <h3 className="font-bold text-foreground mb-2">Mejorá tu perfil</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Los perfiles completos reciben hasta 3x más solicitudes de trabajo.
                  </p>
                  <Button 
                    size="sm" 
                    className="bg-accent hover:bg-accent/90 text-white"
                    onClick={() => router.push('/trabajador/perfil')}
                  >
                    Editar Perfil
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
