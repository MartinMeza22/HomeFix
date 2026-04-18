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
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'in-progress':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Mi Dashboard</h1>
          <p className="text-muted-foreground">Gestiona tus turnos y conversaciones</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Turnos Activos', value: bookings.filter(b => b.status === 'confirmed').length },
            { label: 'Completados', value: bookings.filter(b => b.status === 'completed').length },
            { label: 'Conversaciones', value: conversations.length },
            { label: 'Sin Leer', value: conversations.reduce((sum, c) => sum + c.unread, 0) }
          ].map((stat, idx) => (
            <Card key={idx} className="p-4 space-y-2">
              <p className="text-xs text-muted-foreground uppercase font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Bookings */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Mis Turnos</h2>

            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="p-6 space-y-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground">{booking.workerName}</h3>
                        <p className="text-sm text-muted-foreground">{booking.service}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}>
                        {getStatusLabel(booking.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs uppercase font-medium">Fecha</p>
                        <p className="text-foreground font-semibold">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase font-medium">Hora</p>
                        <p className="text-foreground font-semibold">{booking.time}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase font-medium">Precio</p>
                        <p className="text-foreground font-semibold">Q{booking.price}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">{booking.notes}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm">
                        Cancelar
                      </Button>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
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
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => router.push('/search')}
                >
                  Buscar Profesionales
                </Button>
              </Card>
            )}
          </div>

          {/* Right Column: Chat */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Mensajes</h2>

            {/* Conversation List */}
            <div className="space-y-2">
              {conversations.map((conv) => (
                <Card
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedConversation?.id === conv.id
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{conv.workerName}</h3>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {conv.unread}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Chat Window */}
            {selectedConversation && (
              <Card className="p-4 space-y-4">
                <div className="border-b border-border pb-3">
                  <h3 className="font-bold text-foreground">{selectedConversation.workerName}</h3>
                </div>

                <div className="bg-background rounded-lg h-64 overflow-y-auto space-y-3 p-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`px-3 py-2 rounded-lg max-w-xs text-sm ${
                          msg.sender === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-muted text-foreground'
                        }`}
                      >
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
                    className="flex-1 px-3 py-2 border border-input rounded-lg bg-background text-foreground text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={handleSendMessage}
                    className="bg-primary hover:bg-primary/90"
                  >
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
