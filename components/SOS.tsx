'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function SOS() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEmergency, setIsEmergency] = useState(false)

  const handleEmergency = () => {
    setIsEmergency(true)
    setTimeout(() => {
      setIsEmergency(false)
      setIsOpen(false)
    }, 3000)
  }

  return (
    <>
      {/* SOS Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg flex items-center justify-center font-bold text-2xl transition-all hover:scale-110 active:scale-95"
        title="Emergencia"
      >
        SOS
      </button>

      {/* Emergency Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md space-y-6">
            {isEmergency ? (
              <div className="text-center space-y-4 py-8">
                <div className="text-5xl">✓</div>
                <h2 className="text-2xl font-bold text-foreground">¡Ayuda Enviada!</h2>
                <p className="text-muted-foreground">
                  Hemos notificado a técnicos de emergencia en tu área. Te contactarán en los próximos minutos.
                </p>
                <p className="text-sm text-muted-foreground">
                  Código de referencia: <span className="font-bold text-primary">EM2024041845</span>
                </p>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Solicitud de Emergencia</h2>
                  <p className="text-muted-foreground mt-1">
                    ¿Necesitas ayuda inmediata? Conectaremos contigo con técnicos de emergencia.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">¿Cuál es tu emergencia?</h3>
                  {[
                    { icon: '⚡', label: 'Problema Eléctrico', desc: 'Apagones, cortocircuitos' },
                    { icon: '💧', label: 'Fuga de Agua', desc: 'Tuberías rotas, inundaciones' },
                    { icon: '🔥', label: 'Emergencia Estructural', desc: 'Daños graves en la propiedad' },
                    { icon: '❄️', label: 'HVAC Crítico', desc: 'Sin calefacción o aire acondicionado' }
                  ].map((emergency, idx) => (
                    <button
                      key={idx}
                      onClick={handleEmergency}
                      className="w-full p-3 text-left border border-border rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{emergency.icon}</span>
                        <div>
                          <p className="font-semibold text-foreground">{emergency.label}</p>
                          <p className="text-xs text-muted-foreground">{emergency.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                    onClick={handleEmergency}
                  >
                    Solicitar Ayuda
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Llamaremos a técnicos certificados de emergencia. Costo: Q{Math.floor(Math.random() * 500) + 300} (estimado)
                </p>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
