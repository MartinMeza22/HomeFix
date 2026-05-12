'use client'

import { useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  Camera, 
  X, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Clock,
  User,
  Wrench,
  Upload,
  ImageIcon
} from 'lucide-react'

// Mock trabajo finalizado
const mockTrabajoFinalizado = {
  id: '1',
  titulo: 'Reparacion de tuberia en cocina',
  descripcion: 'Reparacion de canilla que goteaba y cambio de cuerito',
  trabajador: {
    id: '7',
    nombre: 'Pedro Picapiedra',
    categoria: 'Plomeria',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face',
    verificado: true
  },
  fecha: '2026-05-10',
  hora: '10:00',
  ubicacion: 'Recoleta, Buenos Aires',
  estado: 'completado'
}

export default function ResenaPage() {
  const router = useRouter()
  const params = useParams()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comentario, setComentario] = useState('')
  const [fotos, setFotos] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const trabajo = mockTrabajoFinalizado

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/') && fotos.length < 5) {
          const reader = new FileReader()
          reader.onload = (e) => {
            if (e.target?.result) {
              setFotos(prev => [...prev, e.target!.result as string])
            }
          }
          reader.readAsDataURL(file)
        }
      })
    }
  }

  const removePhoto = (index: number) => {
    setFotos(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (rating === 0) return
    
    setIsSubmitting(true)
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSubmitted(true)
    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        
        <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
          <Card className="p-8 sm:p-12 text-center">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Gracias por tu resena
            </h1>
            <p className="text-muted-foreground mb-8">
              Tu opinion ayuda a otros usuarios a encontrar los mejores profesionales y a {trabajo.trabajador.nombre} a seguir mejorando.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => router.push('/dashboard')}
                className="bg-primary hover:bg-primary/90"
              >
                Volver al Dashboard
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.push(`/worker/${trabajo.trabajador.id}`)}
              >
                Ver perfil de {trabajo.trabajador.nombre.split(' ')[0]}
              </Button>
            </div>
          </Card>
        </div>
        
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="bg-primary py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Trabajo Finalizado
          </h1>
          <p className="text-white/70">
            Dejanos tu opinion sobre el servicio recibido
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Resumen del trabajo */}
        <Card className="p-5 sm:p-6 mb-6">
          <div className="flex items-start gap-4">
            <img
              src={trabajo.trabajador.imagen}
              alt={trabajo.trabajador.nombre}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover object-top"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-bold text-foreground text-lg truncate">
                  {trabajo.trabajador.nombre}
                </h2>
                {trabajo.trabajador.verificado && (
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {trabajo.trabajador.categoria}
              </p>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Wrench className="w-4 h-4" />
                  <span className="truncate">{trabajo.titulo}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(trabajo.fecha).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{trabajo.ubicacion}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Calificacion con estrellas */}
        <Card className="p-5 sm:p-6 mb-6">
          <h3 className="font-bold text-foreground mb-4">
            Como calificarias el servicio?
          </h3>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors ${
                    star <= (hoverRating || rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted-foreground/30'
                  }`}
                />
              </button>
            ))}
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            {rating === 0 && 'Toca las estrellas para calificar'}
            {rating === 1 && 'Muy malo'}
            {rating === 2 && 'Malo'}
            {rating === 3 && 'Regular'}
            {rating === 4 && 'Bueno'}
            {rating === 5 && 'Excelente'}
          </p>
        </Card>

        {/* Comentario */}
        <Card className="p-5 sm:p-6 mb-6">
          <h3 className="font-bold text-foreground mb-4">
            Contanos tu experiencia
          </h3>
          
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Describe como fue el servicio, la puntualidad, la calidad del trabajo, el trato del profesional..."
            className="w-full h-32 sm:h-40 p-4 border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground"
          />
          
          <p className="text-xs text-muted-foreground mt-2 text-right">
            {comentario.length}/500 caracteres
          </p>
        </Card>

        {/* Fotos */}
        <Card className="p-5 sm:p-6 mb-8">
          <h3 className="font-bold text-foreground mb-2">
            Agrega fotos del trabajo (opcional)
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Las fotos ayudan a otros usuarios a ver la calidad del trabajo
          </p>
          
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {fotos.map((foto, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                <img
                  src={foto}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
            
            {fotos.length < 5 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              >
                <Camera className="w-6 h-6" />
                <span className="text-xs">Agregar</span>
              </button>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <p className="text-xs text-muted-foreground mt-3">
            Maximo 5 fotos. Formatos: JPG, PNG
          </p>
        </Card>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex-1 sm:flex-none"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Enviando...
              </>
            ) : (
              'Enviar Resena'
            )}
          </Button>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
