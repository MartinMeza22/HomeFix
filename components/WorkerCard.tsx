'use client'

import { RatingStars } from './RatingStars'
import { VerificationBadge } from './VerificationBadge'
import type { Worker } from '@/lib/data/workers'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface WorkerCardProps {
  worker: Worker
  onSelect?: (workerId: string) => void
}

export function WorkerCard({ worker, onSelect }: WorkerCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={worker.image}
          alt={worker.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg text-foreground leading-tight">
              {worker.name}
            </h3>
            {worker.verified && <span className="text-lg">✓</span>}
          </div>
          <p className="text-sm text-muted-foreground">{worker.category}</p>
        </div>

        <RatingStars rating={worker.rating} reviews={worker.reviews} size="sm" />

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>📍</span>
            <span>{worker.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>⏱️</span>
            <span>{worker.responseTime}</span>
          </div>
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span>💰</span>
            <span>Q{worker.hourlyRate}/hora</span>
          </div>
        </div>

        <Button
          className="w-full bg-primary hover:bg-primary/90"
          onClick={() => onSelect?.(worker.id)}
        >
          Ver Perfil
        </Button>
      </div>
    </Card>
  )
}
