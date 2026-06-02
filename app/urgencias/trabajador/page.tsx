'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle,
  X,
  Navigation,
  MessageSquare,
  Droplets,
  ChevronRight,
  Bell,
  DollarSign,
  User
} from 'lucide-react'

// Mock urgencias entrantes para el trabajador
const mockUrgenciasEntrantes = [
  {
    id: 'urg-1',
    tipo: 'Cano roto',
    categoria: 'plomeria',
    descripcion: 'Se rompio un cano debajo de la pileta de la cocina, esta inundando todo. Urgente!',
    cliente: {
      nombre: 'Maria Gomez',
      telefono: '+54 11 5555-1234',
      imagen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop&crop=face'
    },
    ubicacion: 'Av. Santa Fe 1234, Palermo',
    distancia: 1.2,
    tiempoEstimado: '10-15 min',
    hora: 'Hace 3 min',
    precioSugerido: '$15.000 - $25.000',
    estado: 'nueva'
  },
  {
    id: 'urg-2',
    tipo: 'Perdida de agua',
    categoria: 'plomeria',
    descripcion: 'Hay una perdida grande en el bano, el agua no para de salir del inodoro.',
    cliente: {
      nombre: 'Roberto Perez',
      telefono: '+54 11 5555-5678',
      imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face'
    },
    ubicacion: 'Gorriti 4500, Villa Crespo',
    distancia: 2.4,
    tiempoEstimado: '20-25 min',
    hora: 'Hace 8 min',
    precioSugerido: '$10.000 - $18.000',
    estado: 'nueva'
  },
  {
    id: 'urg-3',
    tipo: 'Caneria tapada',
    categoria: 'plomeria',
    descripcion: 'Se tapo la caneria principal, todos los desagues del depto estan colapsados.',
    cliente: {
      nombre: 'Laura Sanchez',
      telefono: '+54 11 5555-9012',
      imagen: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&crop=face'
    },
    ubicacion: 'Arenales 2100, Recoleta',
    distancia: 3.1,
    tiempoEstimado: '25-30 min',
    hora: 'Hace 15 min',
    precioSugerido: '$20.000 - $35.000',
    estado: 'nueva'
  }
]

// Mock urgencias activas (ya aceptadas)
const mockUrgenciasActivas = [
  {
    id: 'urg-act-1',
    tipo: 'Instalacion de calefon',
    cliente: {
      nombre: 'Carlos Fernandez',
      telefono: '+54 11 5555-3456',
      imagen: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&crop=face'
    },
    ubicacion: 'Av. Corrientes 3500, Almagro',
    horaAceptada: '14:30',
    estado: 'en_camino'
  }
]

type Urgencia = typeof mockUrgenciasEntrantes[0]
type UrgenciaActiva = typeof mockUrgenciasActivas[0]

export default function UrgenciasTrabajadorPage() {
  const router = useRouter()
  const [urgencias, setUrgencias] = useState(mockUrgenciasEntrantes)
  const [urgenciasActivas, setUrgenciasActivas] = useState(mockUrgenciasActivas)
  const [urgenciaDetalle, setUrgenciaDetalle] = useState<Urgencia | null>(null)
  const [disponible, setDisponible] = useState(true)

  const handleAceptar = (urgencia: Urgencia) => {
    // Mover a activas
    setUrgenciasActivas(prev => [...prev, {
      id: urgencia.id,
      tipo: urgencia.tipo,
      cliente: urgencia.cliente,
      ubicacion: urgencia.ubicacion,
      horaAceptada: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      estado: 'en_camino' as const
    }])
    // Quitar de entrantes
    setUrgencias(prev => prev.filter(u => u.id !== urgencia.id))
    setUrgenciaDetalle(null)
  }

  const handleRechazar = (urgenciaId: string) => {
    setUrgencias(prev => prev.filter(u => u.id !== urgenciaId))
    setUrgenciaDetalle(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="bg-primary py-6">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Urgencias</h1>
                <p className="text-white/80 text-sm">Panel de trabajador</p>
              </div>
            </div>
            
            {/* Toggle disponibilidad */}
            <button
              onClick={() => setDisponible(!disponible)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                disponible 
                  ? 'bg-accent text-white' 
                  : 'bg-white/20 text-white/70'
              }`}
            >
              {disponible ? 'Disponible' : 'No disponible'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        
        {/* Urgencias activas */}
        {urgenciasActivas.length > 0 && (
          <div>
            <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-accent" />
              En camino ({urgenciasActivas.length})
            </h2>
            <div className="space-y-3">
              {urgenciasActivas.map((urgencia) => (
                <Card key={urgencia.id} className="p-4 border-accent/50 bg-accent/5">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={urgencia.cliente.imagen}
                      alt={urgencia.cliente.nombre}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{urgencia.tipo}</h3>
                      <p className="text-sm text-muted-foreground">{urgencia.cliente.nombre}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                        En camino
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{urgencia.ubicacion}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Navigation className="w-4 h-4 mr-2" />
                      Navegar
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Llamar
                    </Button>
                    <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Llegue
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Urgencias entrantes */}
        <div>
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-destructive" />
            Nuevas solicitudes ({urgencias.length})
          </h2>
          
          {!disponible ? (
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Activa tu disponibilidad para recibir urgencias
              </p>
            </Card>
          ) : urgencias.length === 0 ? (
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <p className="text-muted-foreground">
                No hay urgencias pendientes en este momento
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {urgencias.map((urgencia) => (
                <Card 
                  key={urgencia.id}
                  className="p-4 cursor-pointer hover:border-destructive/50 transition-all border-l-4 border-l-destructive"
                  onClick={() => setUrgenciaDetalle(urgencia)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-blue-500" />
                      <h3 className="font-bold text-foreground">{urgencia.tipo}</h3>
                    </div>
                    <span className="text-xs text-destructive font-medium">{urgencia.hora}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {urgencia.descripcion}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {urgencia.distancia} km
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {urgencia.tiempoEstimado}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Stats del dia */}
        <Card className="p-4">
          <h3 className="font-bold text-foreground mb-3">Resumen del dia</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Completadas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">$45.000</p>
              <p className="text-xs text-muted-foreground">Ganado hoy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">4.9</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </div>
        </Card>

      </div>

      {/* Modal detalle urgencia */}
      {urgenciaDetalle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <Card className="w-full sm:max-w-lg mx-4 mb-0 sm:mb-4 rounded-t-2xl sm:rounded-2xl max-h-[85vh] overflow-y-auto">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-foreground">Detalle de urgencia</h3>
              <button onClick={() => setUrgenciaDetalle(null)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Tipo y tiempo */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{urgenciaDetalle.tipo}</h4>
                    <p className="text-xs text-destructive">{urgenciaDetalle.hora}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-destructive bg-destructive/10 px-3 py-1 rounded-full">
                  Urgente
                </span>
              </div>
              
              {/* Descripcion */}
              <div>
                <p className="text-sm text-foreground">{urgenciaDetalle.descripcion}</p>
              </div>
              
              {/* Cliente */}
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <img
                  src={urgenciaDetalle.cliente.imagen}
                  alt={urgenciaDetalle.cliente.nombre}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{urgenciaDetalle.cliente.nombre}</p>
                  <p className="text-sm text-muted-foreground">{urgenciaDetalle.cliente.telefono}</p>
                </div>
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Info adicional */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">Ubicacion</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{urgenciaDetalle.ubicacion}</p>
                  <p className="text-xs text-muted-foreground">{urgenciaDetalle.distancia} km de distancia</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs">Precio sugerido</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{urgenciaDetalle.precioSugerido}</p>
                  <p className="text-xs text-muted-foreground">Segun tipo de trabajo</p>
                </div>
              </div>
              
              {/* Tiempo estimado */}
              <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">
                    Tiempo de llegada estimado: {urgenciaDetalle.tiempoEstimado}
                  </span>
                </div>
              </div>
              
              {/* Botones */}
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleRechazar(urgenciaDetalle.id)}
                >
                  Rechazar
                </Button>
                <Button 
                  className="flex-1 bg-accent hover:bg-accent/90"
                  onClick={() => handleAceptar(urgenciaDetalle)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aceptar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </main>
  )
}
