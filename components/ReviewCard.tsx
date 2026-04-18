'use client'

import { RatingStars } from './RatingStars'
import type { Review } from '@/lib/data/reviews'
import { Card } from '@/components/ui/card'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formattedDate = new Date(review.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{review.author}</h4>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
        {review.verified && (
          <span className="text-xs font-semibold text-primary px-2 py-1 bg-primary/10 rounded">
            Verificado
          </span>
        )}
      </div>

      <RatingStars rating={review.rating} size="sm" />

      <p className="text-foreground text-sm leading-relaxed">{review.text}</p>
    </Card>
  )
}
