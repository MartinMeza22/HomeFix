'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RatingStars } from '@/components/RatingStars'
import { bookings, type Booking } from '@/lib/data/bookings'
import { conversations, type Conversation } from '@/lib/data/conversations'

export default function DashboardPage() {
  const router = useRouter()
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState<any[]>([])

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv)
    setChatMessages(conv.messages)
  }

  const handleSendMessage = () => {
    if (message.trim() && selectedConversation) {
      const newMessage = {
        id: `m${Date.now()}`,
        sender: 'user',
        text: message,
        timestamp: new Date().toISOString()
      }
      setChatMessages([...chatMessages, newMessage])
      setMessage('')

      // Simulate response
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            id: `m${Date.now()}`,
            sender: 'worker',
            text: 'Gracias por tu mensaje. Lo verificaré y te responderé pronto.',
            timestamp: new Date().toISOString()
          }
        ])
      }, 800)
    }
  }

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-secondary/30 text-foreground border-border'
      case 'confirmed':
        return 'bg-primary/20 text-primary border-border'
      case 'in-progress':
        return 'bg-accent/20 text-accent border-border'
      case 'completed':
        return 'bg-secondary text-foreground border-border'
      case 'cancelled':
        return 'bg-destructive/20 text-destructive border-border'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getStatusLabel = (status: Booking['status']) => {
    const labels: Record<Booking['status'], string> = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      'in-progress': 'En Progreso',
      completed: 'Completado',
      cancelled: 'Cancelado'
    }
    return labels[status]
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2">Mi Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Gestiona tus turnos y conversaciones</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: 'Turnos Activos', value: bookings.filter(b => b.status === 'confirmed').length },
            { label: 'Completados', value: bookings.filter(b => b.status === 'completed').length },
            { label: 'Conversaciones', value: conversations.length },
            { label: 'Sin Leer', value: conversations.reduce((sum, c) => sum + c.unread, 0) }
          ].map((stat, idx) => (
            <Card key={idx} className="p-3 sm:p-4 space-y-1 sm:space-y-2">
              <p className="text-xs text-muted-foreground uppercase font-medium leading-tight">{stat.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex lg:hidden border border-border rounded-lg overflow-hidden mb-6">
          <button
            onClick={() => setSelectedConversation(null)}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
              !selectedConversation ? 'bg-primary text-white' : 'bg-background text-muted-foreground'
            }`}
          >
            Mis Turnos
          </button>
          <button
            onClick={() => {
              if (conversations.length > 0) handleSelectConversation(conversations[0])
            }}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
              selectedConversation ? 'bg-primary text-white' : 'bg-background text-muted-foreground'
            }`}
          >
            Mensajes {conversations.reduce((s, c) => s + c.unread, 0) > 0 && `(${conversations.reduce((s, c) => s + c.unread, 0)})`}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column: Bookings */}
          <div className={`lg:col-span-2 space-y-4 sm:space-y-6 ${selectedConversation ? 'hidden lg:block' : 'block'}`}>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground hidden lg:block">Mis Turnos</h2>

            {bookings.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="p-4 sm:p-6 space-y-3 sm:space-y-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-foreground truncate">{booking.workerName}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{booking.service}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs sm:text-sm font-semibold border whitespace-nowrap flex-shrink-0 ${getStatusColor(booking.status)}`}>
                        {getStatusLabel(booking.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs uppercase font-medium mb-0.5">Fecha</p>
                        <p className="text-foreground font-semibold text-xs sm:text-sm">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase font-medium mb-0.5">Hora</p>
                        <p className="text-foreground font-semibold text-xs sm:text-sm">{booking.time}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase font-medium mb-0.5">Precio</p>
                        <p className="text-foreground font-semibold text-xs sm:text-sm">${booking.price}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border">
                      <p className="text-xs sm:text-sm text-muted-foreground">{booking.notes}</p>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Button variant="outline" size="sm" className="text-xs">Reagendar</Button>
                      <Button variant="outline" size="sm" className="text-xs">Cancelar</Button>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-xs"
                        onClick={() => handleSelectConversation(conversations.find(c => c.workerId === booking.workerId) as Conversation)}
                      >
                        Chat
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">No tienes turnos programados</p>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => router.push('/search')}>
                  Buscar Profesionales
                </Button>
              </Card>
            )}
          </div>

          {/* Right Column: Chat */}
          <div className={`space-y-4 sm:space-y-6 ${selectedConversation ? 'block' : 'hidden lg:block'}`}>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground hidden lg:block">Mensajes</h2>

            {/* Conversation List */}
            <div className="space-y-2">
              {conversations.map((conv) => (
                <Card
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`p-3 sm:p-4 cursor-pointer transition-colors ${
                    selectedConversation?.id === conv.id
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate text-sm">{conv.workerName}</h3>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                        {conv.unread}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Chat Window */}
            {selectedConversation && (
              <Card className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                <div className="border-b border-border pb-3 flex items-center justify-between">
                  <h3 className="font-bold text-foreground text-sm">{selectedConversation.workerName}</h3>
                  <button
                    className="lg:hidden text-xs text-accent font-medium"
                    onClick={() => setSelectedConversation(null)}
                  >
                    Ver Turnos
                  </button>
                </div>
                <div className="bg-background rounded-lg h-56 sm:h-64 overflow-y-auto space-y-3 p-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`px-3 py-2 rounded-lg max-w-[80%] text-sm ${
                        msg.sender === 'user' ? 'bg-primary text-white' : 'bg-muted text-foreground'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-3 py-2 border border-input rounded-lg bg-background text-foreground text-sm min-w-0"
                  />
                  <Button size="sm" onClick={handleSendMessage} className="bg-primary hover:bg-primary/90 flex-shrink-0">
                    Enviar
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
