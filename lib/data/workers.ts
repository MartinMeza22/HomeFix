export interface Worker {
  id: string
  name: string
  category: string
  rating: number
  reviews: number
  location: string
  distance: number
  bio: string
  image: string
  verified: boolean
  responseTime: string
  availability: string[]
  disponibleUrgencia: boolean
}

export const workers: Worker[] = [
  {
    id: '1',
    name: 'Pedro Picapiedra',
    category: 'Plomería',
    rating: 4.9,
    reviews: 247,
    location: 'Palermo, Buenos Aires',
    distance: 2.3,
    bio: 'Hola, soy Pedro, plomero especializado con más de 8 años de experiencia, solucionando urgencias y realizando instalaciones integrales.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face',
    verified: true,
    responseTime: '< 1 hora',
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    disponibleUrgencia: true
  },
  {
    id: '2',
    name: 'Valentina Ríos',
    category: 'Plomería',
    rating: 4.8,
    reviews: 189,
    location: 'Villa Crespo, Buenos Aires',
    distance: 1.5,
    bio: 'Gasista matriculada y plomera con certificación. Atiendo desde pérdidas de agua hasta instalaciones completas de gas. Trabajo en Capital y GBA.',
    image: '/valentina.jpg',
    verified: true,
    responseTime: '< 2 horas',
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    disponibleUrgencia: true
  },
  {
    id: '3',
    name: 'Rodrigo Acosta',
    category: 'Aire Acondicionado',
    rating: 4.7,
    reviews: 156,
    location: 'Caballito, Buenos Aires',
    distance: 3.8,
    bio: 'Técnico en refrigeración con habilitación municipal. Instalación, mantenimiento y reparación de equipos de todas las marcas. Más de 10 años en el rubro.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&crop=face',
    verified: true,
    responseTime: '< 3 horas',
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    disponibleUrgencia: false
  },
  {
    id: '4',
    name: 'Florencia Paredes',
    category: 'Carpintería',
    rating: 4.9,
    reviews: 213,
    location: 'San Telmo, Buenos Aires',
    distance: 2.1,
    bio: 'Carpintera especializada en diseño de interiores y muebles a medida. Trabajo con madera maciza y placas. Presupuesto sin cargo.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop&crop=face',
    verified: true,
    responseTime: '< 4 horas',
    availability: ['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    disponibleUrgencia: false
  },
  {
    id: '5',
    name: 'Ignacio Ferreyra',
    category: 'Albañilería',
    rating: 4.3,
    reviews: 75,
    location: 'Villa Lugano, Buenos Aires',
    distance: 8.5,
    bio: 'Albañil de oficio de toda la vida. Hago revoque, contrapiso, cerámicos y arreglos en general. Trabajo prolijo y sin vueltas. Mandame un mensajito y lo vemos.',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=500&h=500&fit=crop&crop=face',
    verified: false,
    responseTime: '< 2 horas',
    availability: ['Lunes', 'Miércoles', 'Viernes', 'Sábado'],
    disponibleUrgencia: true
  },
  {
    id: '6',
    name: 'Camila Suárez',
    category: 'Pintura',
    rating: 4.8,
    reviews: 178,
    location: 'Almagro, Buenos Aires',
    distance: 1.8,
    bio: 'Pintora profesional con 12 años de trayectoria. Trabajo en interior y exterior, pintura decorativa, texturados y empastes. Materiales de primera calidad.',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=500&h=500&fit=crop&crop=face',
    verified: true,
    responseTime: '< 2 horas',
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    disponibleUrgencia: false
  },
  {
    id: '7',
    name: 'Carlos Mendez',
    category: 'Electricista',
    rating: 4.9,
    reviews: 312,
    location: 'Recoleta, Buenos Aires',
    distance: 2.5,
    bio: 'Electricista matriculado con amplia experiencia en tableros, cableado y resolución de cortocircuitos. Trabajo rápido, seguro y prolijo.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop&crop=face',
    verified: true,
    responseTime: '< 1 hora',
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    disponibleUrgencia: true
  },
  {
    id: '8',
    name: 'Marcelo Gutierrez',
    category: 'Plomería',
    rating: 4.6,
    reviews: 89,
    location: 'Flores, Buenos Aires',
    distance: 4.2,
    bio: 'Gasista y plomero matriculado. Realizo instalaciones completas, reparaciones y mantenimiento. Trabajo prolijo y garantizado.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&crop=face',
    verified: true,
    responseTime: '< 3 horas',
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    disponibleUrgencia: false
  },
  {
    id: '9',
    name: 'Diego Ramirez',
    category: 'Plomería',
    rating: 4.4,
    reviews: 45,
    location: 'Boedo, Buenos Aires',
    distance: 3.1,
    bio: 'Plomero con experiencia en reparaciones domesticas e industriales. Disponibilidad inmediata para urgencias.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop&crop=face',
    verified: false,
    responseTime: '< 2 horas',
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    disponibleUrgencia: true
  }
]
