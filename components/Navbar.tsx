'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface NavbarProps {
  onNavigate?: (path: string) => void
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavigate = (path: string) => {
    onNavigate?.(path)
    setMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">O</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">OFIX</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link href="/search" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Buscar
            </Link>
            <Link href="/diagnostico" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Diagnóstico
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline">Iniciar Sesión</Button>
            <Button className="bg-primary hover:bg-primary/90">Registrarse</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-4 pt-4 pb-4 space-y-3">
              <Link href="/" className="block px-3 py-2 rounded-md text-foreground hover:bg-secondary">
                Inicio
              </Link>
              <Link href="/search" className="block px-3 py-2 rounded-md text-foreground hover:bg-secondary">
                Buscar
              </Link>
              <Link href="/diagnostico" className="block px-3 py-2 rounded-md text-foreground hover:bg-secondary">
                Diagnóstico
              </Link>
              <Link href="/dashboard" className="block px-3 py-2 rounded-md text-foreground hover:bg-secondary">
                Dashboard
              </Link>
              <div className="pt-3 space-y-2 border-t border-border">
                <Button variant="outline" className="w-full">Iniciar Sesión</Button>
                <Button className="w-full bg-primary hover:bg-primary/90">Registrarse</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
