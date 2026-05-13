'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

interface BackButtonProps {
  href?: string
  label?: string
  className?: string
}

export function BackButton({ href, label = 'Volver', className = '' }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group ${className}`}
    >
      <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
      {label}
    </button>
  )
}
