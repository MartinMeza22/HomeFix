export interface Category {
  id: string
  name: string
  icon: string
  image: string
  description: string
  count: number
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electricidad',
    icon: '⚡',
    image: '/categories/electricidad.jpg',
    description: 'Instalaciones y reparaciones eléctricas',
    count: 342
  },
  {
    id: '2',
    name: 'Plomería',
    icon: '🔧',
    image: '/categories/plomeria.jpg',
    description: 'Tuberías y sistemas de agua',
    count: 289
  },
  {
    id: '4',
    name: 'Carpintería',
    icon: '🪵',
    image: '/categories/carpinteria.jpg',
    description: 'Muebles y trabajos en madera',
    count: 218
  },
  {
    id: '5',
    name: 'Instalador de aire acondicionado',
    icon: '❄️',
    image: '/categories/aire-acondicionado.png',
    description: 'Instalación y servicio de aires acondicionados',
    count: 156
  },
  {
    id: '6',
    name: 'Pintura',
    icon: '🎨',
    image: '/categories/pintura.jpg',
    description: 'Interior y exterior',
    count: 267
  },
  {
    id: '7',
    name: 'Albañilería',
    icon: '🧱',
    image: '/categories/albanileria.jpg',
    description: 'Construcción y reparaciones',
    count: 198
  },
  {
    id: '8',
    name: 'Cerrajería',
    icon: '🔐',
    image: '/categories/cerrajeria.jpg',
    description: 'Cerraduras y seguridad',
    count: 134
  },
  {
    id: '9',
    name: 'Climatización',
    icon: '💨',
    image: '/categories/climatizacion.png',
    description: 'Sistemas de calefacción y ventilación',
    count: 112
  }
]
