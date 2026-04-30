'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Menu, X } from 'lucide-react'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">OFIX</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Inicio
            </Link>
            <Link href="/search" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Buscar Profesionales
            </Link>
            <Link href="/diagnostico" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Diagnostico IA
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Iniciar Sesion
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              Registrarse
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="space-y-1">
              <Link 
                href="/" 
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/search" 
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Buscar Profesionales
              </Link>
              <Link 
                href="/diagnostico" 
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Diagnostico IA
              </Link>
              <Link 
                href="/dashboard" 
                className="block px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-border space-y-3 px-4">
              <Button variant="outline" className="w-full">Iniciar Sesion</Button>
              <Button className="w-full bg-primary hover:bg-primary/90">Registrarse</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
