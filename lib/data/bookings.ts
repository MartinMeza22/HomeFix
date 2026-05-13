export interface Booking {
  id: string
  workerId: string
  workerName: string
  service: string
  date: string
  time: string
  location: string
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  price: number
  notes: string
}

export const bookings: Booking[] = [
  {
    id: 'b1',
    workerId: '1',
    workerName: 'Pedro Picapiedra',
    service: 'Arreglo de cañerías',
    date: '2024-04-20',
    time: '10:00 AM',
    location: 'Palermo, Buenos Aires',
    status: 'confirmed',
    price: 450,
    notes: 'Revisar todos los caños del primer piso'
  },
  {
    id: 'b2',
    workerId: '2',
    workerName: 'Valentina Ríos',
    service: 'Reparación de tubería',
    date: '2024-04-25',
    time: '2:00 PM',
    location: 'Villa Crespo, Buenos Aires',
    status: 'pending',
    price: 350,
    notes: 'Fuga en el baño principal'
  },
  {
    id: 'b3',
    workerId: '3',
    workerName: 'Rodrigo Acosta',
    service: 'Mantenimiento de aire acondicionado',
    date: '2024-04-10',
    time: '9:00 AM',
    location: 'Caballito, Buenos Aires',
    status: 'completed',
    price: 300,
    notes: 'Limpieza de filtros y revisión general'
  }
]
