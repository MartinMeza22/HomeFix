export interface Category {
  id: string
  name: string
  icon: string
  description: string
  count: number
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electricidad',
    icon: '⚡',
    description: 'Instalaciones y reparaciones eléctricas',
    count: 342
  },
  {
    id: '2',
    name: 'Plomería',
    icon: '🔧',
    description: 'Tuberías y sistemas de agua',
    count: 289
  },
  {
    id: '3',
    name: 'HVAC',
    icon: '❄️',
    description: 'Aire acondicionado y calefacción',
    count: 156
  },
  {
    id: '4',
    name: 'Carpintería',
    icon: '🪵',
    description: 'Muebles y trabajos en madera',
    count: 218
  },
  {
    id: '5',
    name: 'Electrónica',
    icon: '📱',
    description: 'Reparación de electrodomésticos',
    count: 147
  },
  {
    id: '6',
    name: 'Pintura',
    icon: '🎨',
    description: 'Interior y exterior',
    count: 267
  },
  {
    id: '7',
    name: 'Albañilería',
    icon: '🧱',
    description: 'Construcción y reparaciones',
    count: 198
  },
  {
    id: '8',
    name: 'Cerrajería',
    icon: '🔐',
    description: 'Cerraduras y seguridad',
    count: 134
  }
]
