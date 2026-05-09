'use client'

import { useState, useEffect } from 'react'
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
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Mock trabajador data (simulando sesion)
const mockTrabajador = {
  id: '1',
  name: 'Carlos Mendez',
  email: 'trabajador@demo.com',
  category: 'Electricista',
  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop&crop=face',
  rating: 4.9,
  reviews: 247,
  location: 'Palermo, Buenos Aires',
  verified: true,
  memberSince: 'Marzo 2024',
  completedJobs: 312,
  responseRate: 98,
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
    titulo: 'Instalacion de luces LED en cocina',
    descripcion: 'Necesito instalar 6 spots LED en la cocina. Ya tengo las luces.',
    categoria: 'Electricista',
    ubicacion: 'Recoleta, Buenos Aires',
    distancia: 3.2,
    urgencia: 'media',
    fechaPublicacion: '2026-05-08',
    presupuestoEstimado: '$15,000 - $25,000',
    cliente: 'Maria G.'
  },
  {
    id: '2',
    titulo: 'Revision de tablero electrico',
    descripcion: 'El tablero salta cada vez que prendo el aire. Necesito una revision urgente.',
    categoria: 'Electricista',
    ubicacion: 'Palermo, Buenos Aires',
    distancia: 1.5,
    urgencia: 'alta',
    fechaPublicacion: '2026-05-09',
    presupuestoEstimado: '$10,000 - $20,000',
    cliente: 'Juan P.'
  },
  {
    id: '3',
    titulo: 'Cambio de cableado en departamento',
    descripcion: 'Depto de 2 ambientes, cableado viejo. Quiero cambiar todo.',
    categoria: 'Electricista',
    ubicacion: 'Villa Crespo, Buenos Aires',
    distancia: 2.8,
    urgencia: 'baja',
    fechaPublicacion: '2026-05-07',
    presupuestoEstimado: '$50,000 - $80,000',
    cliente: 'Laura M.'
  }
]

// Mock postulaciones
const mockPostulaciones = [
  {
    id: '1',
    trabajo: 'Reparacion de toma corrientes',
    cliente: 'Roberto S.',
    estado: 'pendiente',
    fechaPostulacion: '2026-05-08'
  },
  {
    id: '2',
    trabajo: 'Instalacion de ventiladores de techo',
    cliente: 'Ana K.',
    estado: 'aceptada',
    fechaPostulacion: '2026-05-06'
  }
]

// Mock citas proximas
const mockCitas = [
  {
    id: '1',
    cliente: 'Sofia Martinez',
    servicio: 'Instalacion electrica',
    fecha: '2026-05-10',
    hora: '10:00',
    ubicacion: 'Belgrano, Buenos Aires'
  },
  {
    id: '2',
    cliente: 'Pedro Gonzalez',
    servicio: 'Revision de tablero',
    fecha: '2026-05-11',
    hora: '14:30',
    ubicacion: 'Palermo, Buenos Aires'
  }
]

export default function TrabajadorDashboard() {
  const router = useRouter()
  const [trabajador] = useState(mockTrabajador)

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
    <div className="min-h-screen bg-background flex flex-col">
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
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white/20"
                />
                {trabajador.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center border-2 border-primary">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">Hola, {trabajador.name.split(' ')[0]}</h1>
                </div>
                <p className="text-white/70 mb-2">{trabajador.category} - {trabajador.location}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-white/80">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-semibold">{trabajador.rating}</span>
                    <span className="text-white/60">({trabajador.reviews} resenas)</span>
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
                { label: 'Citas Proximas', value: mockCitas.length, icon: Calendar, color: 'text-yellow-400' },
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

                {/* Proximas Citas */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground">Proximas Citas</h2>
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
                      <p className="text-muted-foreground">No tienes citas proximas</p>
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

                {/* Accesos Rapidos */}
                <Card className="p-6 border-border/50">
                  <h3 className="font-bold text-foreground mb-4">Accesos Rapidos</h3>
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
                  <h3 className="font-bold text-foreground mb-2">Mejora tu perfil</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Los perfiles completos reciben hasta 3x mas solicitudes de trabajo.
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
