'use client'

import Link from 'next/link'
import { Shield } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">OFIX</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Plataforma de confianza que conecta personas con profesionales verificados. 
              Seguridad, transparencia y calidad garantizada.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                Verificacion Triple
              </div>
              <div className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-medium">
                Sin Comisiones
              </div>
            </div>
          </div>

          {/* Plataforma */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm">Plataforma</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-foreground transition-colors">
                  Buscar Profesionales
                </Link>
              </li>
              <li>
                <Link href="/diagnostico" className="text-muted-foreground hover:text-foreground transition-colors">
                  Diagnostico IA
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Para Profesionales
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm">Empresa</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Seguridad
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terminos de Servicio
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; 2024 OFIX. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-foreground transition-colors">LinkedIn</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Instagram</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
