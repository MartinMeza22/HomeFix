import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RatingStars } from '@/components/RatingStars'
import { VerificationBadge } from '@/components/VerificationBadge'
import { ReviewCard } from '@/components/ReviewCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { workers } from '@/lib/data/workers'
import { reviews as allReviews } from '@/lib/data/reviews'
import { WorkerChatClient } from '@/components/WorkerChatClient'

export default async function WorkerProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const worker = workers.find(w => w.id === id)

  if (!worker) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Profesional no encontrado</h1>
          <Link href="/search">
            <Button className="bg-primary hover:bg-primary/90">
              Volver a Buscar
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const workerReviews = allReviews.filter(r => r.workerId === worker.id)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/search" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors">
          <span>←</span>
          <span className="font-medium">Volver</span>
        </Link>

        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground">{worker.name}</h1>
                  <p className="text-lg text-muted-foreground mt-1">{worker.category}</p>
                </div>
                {worker.verified && <VerificationBadge verified={true} />}
              </div>
              <RatingStars rating={worker.rating} reviews={worker.reviews} size="lg" />
            </div>

            <Card className="p-6 bg-secondary space-y-4">
              <h2 className="font-bold text-lg text-foreground">Sobre Mí</h2>
              <p className="text-foreground leading-relaxed">{worker.bio}</p>
            </Card>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Ubicación', value: worker.location },
                { label: 'Distancia', value: `${worker.distance} km` },
                { label: 'Tarifa Hora', value: `Q${worker.hourlyRate}` },
                { label: 'Respuesta', value: worker.responseTime }
              ].map((item, idx) => (
                <Card key={idx} className="p-4 space-y-2">
                  <p className="text-xs text-muted-foreground font-medium uppercase">{item.label}</p>
                  <p className="font-bold text-foreground">{item.value}</p>
                </Card>
              ))}
            </div>

            {/* Availability */}
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-lg text-foreground">Disponibilidad</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
                  <div
                    key={day}
                    className={`p-3 rounded-lg text-center font-medium text-sm transition-colors ${
                      worker.availability.includes(day)
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {day.substring(0, 3)}
                  </div>
                ))}
              </div>
            </Card>

            {/* Reviews Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                Reseñas ({workerReviews.length})
              </h2>

              {workerReviews.length > 0 ? (
                <div className="space-y-4">
                  {workerReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No hay reseñas aún</p>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Image */}
            <Card className="overflow-hidden">
              <img
                src={worker.image}
                alt={worker.name}
                className="w-full aspect-square object-cover"
              />
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <WorkerChatClient workerName={worker.name} />
              <Button
                size="lg"
                variant="outline"
                className="w-full"
              >
                Agendar Cita
              </Button>
            </div>

            {/* Stats */}
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-foreground">Estadísticas</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trabajos Completados</span>
                  <span className="font-semibold text-foreground">{worker.reviews * 2}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tasa Aceptación</span>
                  <span className="font-semibold text-foreground">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tiempo Promedio</span>
                  <span className="font-semibold text-foreground">2.5 horas</span>
                </div>
              </div>
            </Card>

            {/* Verification Info */}
            {worker.verified && (
              <Card className="p-6 bg-primary/5 border border-primary/20 space-y-3">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <span>✓</span>
                  Verificado
                </h3>
                <p className="text-sm text-foreground">
                  Este profesional ha pasado nuestro proceso completo de verificación de identidad y referencias.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
