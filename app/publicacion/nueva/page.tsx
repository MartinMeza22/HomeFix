'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { categories } from '@/lib/data/categories'
import {
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  ClipboardList,
  Sparkles,
  Send,
  Calendar,
  HelpCircle,
  CheckCircle,
  Loader2,
  FileText,
  X
} from 'lucide-react'

type CreationMode = 'select' | 'prompt' | 'form'

interface AIMessage {
  role: 'user' | 'assistant'
  content: string
}

interface FormData {
  titulo: string
  descripcion: string
  categorias: string[]
  noSeQueCategoria: boolean
  fecha: string
  urgencia: 'baja' | 'media' | 'alta' | 'urgente'
  presupuestoMin: string
  presupuestoMax: string
  ubicacion: string
}

export default function NuevaPublicacionPage() {
  const router = useRouter()
  const [mode, setMode] = useState<CreationMode>('select')
  const [isLoading, setIsLoading] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [publicacionCreada, setPublicacionCreada] = useState(false)

  // AI Prompt mode state
  const [prompt, setPrompt] = useState('')
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([])
  const [aiAnalysis, setAiAnalysis] = useState<{
    categorias: string[]
    descripcion: string
    urgencia: string
    titulo: string
  } | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Form mode state
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descripcion: '',
    categorias: [],
    noSeQueCategoria: false,
    fecha: '',
    urgencia: 'media',
    presupuestoMin: '',
    presupuestoMax: '',
    ubicacion: ''
  })
  const [formStep, setFormStep] = useState(1)

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [aiMessages])

  // AI Prompt handlers
  const handleSendPrompt = async () => {
    if (!prompt.trim() || isLoading) return

    const userMessage = prompt.trim()
    setPrompt('')
    setAiMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      // Check if the message has enough detail
      const hasCategory = categories.some(cat =>
        userMessage.toLowerCase().includes(cat.name.toLowerCase())
      )
      const hasLocation = userMessage.toLowerCase().includes('ubicacion') ||
        userMessage.toLowerCase().includes('direccion') ||
        userMessage.toLowerCase().includes('zona') ||
        userMessage.toLowerCase().includes('barrio')
      const isDetailed = userMessage.length > 50

      if (!isDetailed || aiMessages.length < 2) {
        // Ask follow-up questions
        const followUps = [
          'Gracias por tu mensaje. Para ayudarte mejor, necesito algunos detalles adicionales:\n\n- Cual es exactamente el problema que estas experimentando?\n- Donde se encuentra ubicado el problema (ej: cocina, bano, sala)?\n- Hace cuanto tiempo tienes este problema?',
          'Entiendo. Algunas preguntas mas para encontrar al profesional ideal:\n\n- Tienes alguna preferencia de horario para la visita?\n- Cual es tu presupuesto aproximado?\n- Es una situacion urgente o puede esperar unos dias?',
          'Perfecto, ya tengo suficiente informacion. He analizado tu solicitud y te muestro un resumen para confirmar.'
        ]

        const responseIndex = Math.min(aiMessages.filter(m => m.role === 'assistant').length, followUps.length - 1)
        const response = followUps[responseIndex]

        setAiMessages(prev => [...prev, { role: 'assistant', content: response }])

        // If this is the final message, generate analysis
        if (responseIndex === followUps.length - 1) {
          setTimeout(() => {
            setAiAnalysis({
              categorias: ['Plomeria'],
              descripcion: userMessage,
              urgencia: 'media',
              titulo: 'Reparacion de ' + (userMessage.slice(0, 30) + '...')
            })
          }, 500)
        }
      }

      setIsLoading(false)
    }, 1500)
  }

  // Form handlers
  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categorias: prev.categorias.includes(categoryId)
        ? prev.categorias.filter(id => id !== categoryId)
        : [...prev.categorias, categoryId]
    }))
  }

  const handleFormSubmit = async () => {
    setIsPublishing(true)
    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false)
      setPublicacionCreada(true)
    }, 2000)
  }

  const handleAIPublish = async () => {
    setIsPublishing(true)
    setTimeout(() => {
      setIsPublishing(false)
      setPublicacionCreada(true)
    }, 2000)
  }

  // Success screen
  if (publicacionCreada) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="p-8 sm:p-12 text-center border-border">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Publicacion Creada Exitosamente
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Tu solicitud ya esta visible para los profesionales. Te notificaremos cuando recibas postulaciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => router.push('/mis-publicaciones')}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Ver mis publicaciones
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPublicacionCreada(false)
                  setMode('select')
                  setAiMessages([])
                  setAiAnalysis(null)
                  setFormData({
                    titulo: '',
                    descripcion: '',
                    categorias: [],
                    noSeQueCategoria: false,
                    fecha: '',
                    urgencia: 'media',
                    presupuestoMin: '',
                    presupuestoMax: '',
                    ubicacion: ''
                  })
                  setFormStep(1)
                }}
              >
                Crear otra publicacion
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/mis-publicaciones"
            className="inline-flex items-center text-white/70 hover:text-white mb-4 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a mis publicaciones
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Nueva Publicacion</h1>
          <p className="text-white/70 mt-2">Describe tu problema y conecta con profesionales verificados</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Mode Selection */}
        {mode === 'select' && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Como queres crear tu publicacion?
              </h2>
              <p className="text-muted-foreground">
                Elige la opcion que te resulte mas comoda
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {/* AI Prompt Option */}
              <Card
                className="p-6 sm:p-8 border-border hover:border-accent/50 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setMode('prompt')}
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <Sparkles className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Asistente Inteligente
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Describe tu problema en tus propias palabras y nuestra IA te guiara para crear la publicacion perfecta.
                </p>
                <div className="flex items-center text-accent text-sm font-medium">
                  Comenzar con IA
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>

              {/* Form Option */}
              <Card
                className="p-6 sm:p-8 border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setMode('form')}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <ClipboardList className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Formulario Guiado
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Completa un formulario paso a paso con fecha, categoria y descripcion de tu problema.
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Completar formulario
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </div>

            {/* Link to diagnostic */}
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground mb-2">
                No sabes exactamente que necesitas?
              </p>
              <Link
                href="/diagnostico"
                className="inline-flex items-center text-accent hover:text-accent/80 font-medium text-sm"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Usa nuestro diagnostico inteligente
              </Link>
            </div>
          </div>
        )}

        {/* AI Prompt Mode */}
        {mode === 'prompt' && (
          <div className="space-y-6">
            {/* Back button */}
            <button
              onClick={() => {
                setMode('select')
                setAiMessages([])
                setAiAnalysis(null)
              }}
              className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cambiar metodo
            </button>

            <Card className="border-border overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Asistente HomeFix</h3>
                    <p className="text-xs text-muted-foreground">Te ayudo a crear tu publicacion</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-80 sm:h-96 overflow-y-auto p-4 space-y-4 bg-background">
                {/* Welcome message */}
                {aiMessages.length === 0 && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-accent" />
                    </div>
                    <div className="bg-secondary/50 rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%]">
                      <p className="text-sm text-foreground">
                        Hola! Soy tu asistente de HomeFix. Contame con tus palabras que problema tenes en tu hogar y te ayudo a encontrar al profesional ideal.
                      </p>
                    </div>
                  </div>
                )}

                {/* Messages */}
                {aiMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-accent" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                        msg.role === 'user'
                          ? 'bg-primary text-white rounded-tr-none'
                          : 'bg-secondary/50 text-foreground rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-accent" />
                    </div>
                    <div className="bg-secondary/50 rounded-2xl rounded-tl-none px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Analizando...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* AI Analysis Result */}
              {aiAnalysis && (
                <div className="p-4 border-t border-border bg-accent/5">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent" />
                    Resumen de tu solicitud
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Titulo:</span>
                      <span className="font-medium text-foreground">{aiAnalysis.titulo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Categoria:</span>
                      <div className="flex gap-1">
                        {aiAnalysis.categorias.map(cat => (
                          <Badge key={cat} variant="secondary" className="bg-primary/10 text-primary">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Urgencia:</span>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                        {aiAnalysis.urgencia}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={handleAIPublish}
                    disabled={isPublishing}
                    className="w-full mt-4 bg-accent hover:bg-accent/90 text-white"
                  >
                    {isPublishing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Publicando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirmar y Publicar
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Chat Input */}
              {!aiAnalysis && (
                <div className="p-4 border-t border-border bg-background">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendPrompt()}
                      placeholder="Describe tu problema..."
                      className="flex-1 px-4 py-2.5 border border-input rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendPrompt}
                      disabled={!prompt.trim() || isLoading}
                      className="bg-accent hover:bg-accent/90 text-white px-4"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Form Mode */}
        {mode === 'form' && (
          <div className="space-y-6">
            {/* Back button */}
            <button
              onClick={() => {
                setMode('select')
                setFormStep(1)
              }}
              className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cambiar metodo
            </button>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      formStep >= step
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {formStep > step ? <CheckCircle className="w-4 h-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-12 sm:w-20 h-1 mx-1 rounded ${
                        formStep > step ? 'bg-primary' : 'bg-secondary'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <Card className="p-6 sm:p-8 border-border">
              {/* Step 1: Category & Date */}
              {formStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Categoria y Fecha</h3>
                    <p className="text-sm text-muted-foreground">Selecciona el tipo de servicio que necesitas</p>
                  </div>

                  {/* Categories */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      Especialidad requerida
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryToggle(cat.id)}
                          disabled={formData.noSeQueCategoria}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            formData.categorias.includes(cat.id)
                              ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                              : 'border-border hover:border-primary/30'
                          } ${formData.noSeQueCategoria ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <span className="text-2xl mb-1 block">{cat.icon}</span>
                          <span className="text-xs font-medium text-foreground">{cat.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Don't know checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer mt-3">
                      <input
                        type="checkbox"
                        checked={formData.noSeQueCategoria}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          noSeQueCategoria: e.target.checked,
                          categorias: e.target.checked ? [] : prev.categorias
                        }))}
                        className="w-4 h-4 rounded border-input text-accent focus:ring-accent"
                      />
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <HelpCircle className="w-4 h-4" />
                        No se que especialidad necesito
                      </span>
                    </label>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Fecha preferida para el servicio
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="date"
                        value={formData.fecha}
                        onChange={(e) => setFormData(prev => ({ ...prev, fecha: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-2.5 border border-input rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Urgency */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Nivel de urgencia</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { value: 'baja', label: 'Baja', desc: 'Puede esperar' },
                        { value: 'media', label: 'Media', desc: 'Esta semana' },
                        { value: 'alta', label: 'Alta', desc: 'Hoy o manana' },
                        { value: 'urgente', label: 'Urgente', desc: 'Ahora mismo' }
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setFormData(prev => ({ ...prev, urgencia: opt.value as FormData['urgencia'] }))}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            formData.urgencia === opt.value
                              ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                              : 'border-border hover:border-primary/30'
                          }`}
                        >
                          <span className="text-sm font-medium text-foreground block">{opt.label}</span>
                          <span className="text-xs text-muted-foreground">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => setFormStep(2)}
                    disabled={(!formData.categorias.length && !formData.noSeQueCategoria) || !formData.fecha}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}

              {/* Step 2: Description */}
              {formStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Descripcion del Problema</h3>
                    <p className="text-sm text-muted-foreground">Detalla lo que necesitas para que los profesionales entiendan tu solicitud</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Titulo de la publicacion</label>
                    <input
                      type="text"
                      value={formData.titulo}
                      onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
                      placeholder="Ej: Reparacion de tuberia en cocina"
                      className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Describe tu problema en detalle</label>
                    <textarea
                      value={formData.descripcion}
                      onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                      placeholder="Explica que esta pasando, donde se encuentra el problema, hace cuanto tiempo lo notas, etc."
                      rows={5}
                      className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                    />
                    <p className="text-xs text-muted-foreground">{formData.descripcion.length}/500 caracteres</p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setFormStep(1)}
                      className="flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Atras
                    </Button>
                    <Button
                      onClick={() => setFormStep(3)}
                      disabled={!formData.titulo || !formData.descripcion}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    >
                      Continuar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Location & Budget */}
              {formStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Ubicacion y Presupuesto</h3>
                    <p className="text-sm text-muted-foreground">Informacion adicional para los profesionales</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Ubicacion del servicio</label>
                    <input
                      type="text"
                      value={formData.ubicacion}
                      onChange={(e) => setFormData(prev => ({ ...prev, ubicacion: e.target.value }))}
                      placeholder="Ej: Buenos Aires, Palermo"
                      className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Presupuesto estimado (opcional)</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                        <input
                          type="number"
                          value={formData.presupuestoMin}
                          onChange={(e) => setFormData(prev => ({ ...prev, presupuestoMin: e.target.value }))}
                          placeholder="Min"
                          className="w-full pl-8 pr-4 py-2.5 border border-input rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                      </div>
                      <span className="text-muted-foreground">-</span>
                      <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                        <input
                          type="number"
                          value={formData.presupuestoMax}
                          onChange={(e) => setFormData(prev => ({ ...prev, presupuestoMax: e.target.value }))}
                          placeholder="Max"
                          className="w-full pl-8 pr-4 py-2.5 border border-input rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="p-4 bg-secondary/30 rounded-xl space-y-3">
                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      Resumen de tu publicacion
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Titulo:</span>
                        <span className="font-medium text-foreground text-right max-w-[60%] truncate">{formData.titulo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Categoria:</span>
                        <span className="font-medium text-foreground">
                          {formData.noSeQueCategoria
                            ? 'Por determinar'
                            : formData.categorias.map(id => categories.find(c => c.id === id)?.name).join(', ')
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fecha:</span>
                        <span className="font-medium text-foreground">{formData.fecha}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Urgencia:</span>
                        <Badge variant="secondary" className={`
                          ${formData.urgencia === 'urgente' ? 'bg-red-100 text-red-700' : ''}
                          ${formData.urgencia === 'alta' ? 'bg-orange-100 text-orange-700' : ''}
                          ${formData.urgencia === 'media' ? 'bg-amber-100 text-amber-700' : ''}
                          ${formData.urgencia === 'baja' ? 'bg-green-100 text-green-700' : ''}
                        `}>
                          {formData.urgencia.charAt(0).toUpperCase() + formData.urgencia.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setFormStep(2)}
                      className="flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Atras
                    </Button>
                    <Button
                      onClick={handleFormSubmit}
                      disabled={!formData.ubicacion || isPublishing}
                      className="flex-1 bg-accent hover:bg-accent/90 text-white"
                    >
                      {isPublishing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Publicando...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Publicar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
