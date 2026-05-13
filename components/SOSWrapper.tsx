'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SOS } from '@/components/SOS'

export function SOSWrapper() {
  const [showSOS, setShowSOS] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let role = 'guest'
    try {
      const session = JSON.parse(sessionStorage.getItem('homefix_session') || '{}')
      if (session.role) {
        role = session.role
      }
    } catch {}

    // Forzar rol según la URL para la demostración
    if (pathname.includes('/trabajador') || pathname.includes('/verificacion') || pathname === '/dashboard/trabajador') {
      role = 'trabajador'
    } else if (pathname === '/dashboard' || pathname.includes('/publicacion/nueva') || pathname.includes('/mis-publicaciones')) {
      role = 'cliente'
    }

    // SOLO mostrar si el rol final es cliente
    setShowSOS(role === 'cliente')
  }, [pathname])

  if (!showSOS) return null

  return <SOS showForTrabajador={true} />
}
