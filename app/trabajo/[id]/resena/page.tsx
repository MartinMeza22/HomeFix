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
        
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Card className="p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Gracias por tu resena
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Tu opinion ayuda a {trabajo.trabajador.nombre} a mejorar su servicio.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                size="sm"
                onClick={() => router.push('/dashboard')}
                className="bg-primary hover:bg-primary/90"
              >
                Volver al Dashboard
              </Button>
              <Button 
                size="sm"
                variant="outline"
                onClick={() => router.push(`/worker/${trabajo.trabajador.id}`)}
              >
                Ver perfil
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
      <div className="bg-primary py-4 sm:py-6">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Trabajo Finalizado
          </h1>
          <p className="text-white/70 text-sm">
            Dejanos tu opinion sobre el servicio
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Resumen del trabajo */}
        <Card className="p-4 text-base">
          <div className="flex items-center gap-3">
            <img
              src={trabajo.trabajador.imagen}
              alt={trabajo.trabajador.nombre}
              className="w-16 h-16 rounded-lg object-cover object-top flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="font-bold text-foreground text-base truncate">
                  {trabajo.trabajador.nombre}
                </h2>
                {trabajo.trabajador.verificado && (
                  <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-1">
                {trabajo.trabajador.categoria}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {trabajo.titulo}
              </p>
            </div>
          </div>
        </Card>

        {/* Calificacion con estrellas */}
        <Card className="p-4">
          <h3 className="font-bold text-foreground text-sm mb-3">
            Como calificarias el servicio?
          </h3>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                    star <= (hoverRating || rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted-foreground/30'
                  }`}
                />
              </button>
            ))}
          </div>
          
          <p className="text-center text-xs text-muted-foreground">
            {rating === 0 && 'Toca las estrellas para calificar'}
            {rating === 1 && 'Muy malo'}
            {rating === 2 && 'Malo'}
            {rating === 3 && 'Regular'}
            {rating === 4 && 'Bueno'}
            {rating === 5 && 'Excelente'}
          </p>
        </Card>

        {/* Comentario */}
        <Card className="p-4">
          <h3 className="font-bold text-foreground text-sm mb-2">
            Tu opinion
          </h3>
          
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Describe tu experiencia con el servicio..."
            className="w-full h-20 sm:h-24 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground text-sm"
          />
          
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {comentario.length}/500
          </p>
        </Card>

        {/* Fotos */}
        <Card className="p-4">
          <h3 className="font-bold text-foreground text-sm mb-2">
            Fotos (opcional)
          </h3>
          
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {fotos.map((foto, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                <img
                  src={foto}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
            
            {fotos.length < 5 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Camera className="w-5 h-5" />
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
        </Card>

        {/* Botones */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
