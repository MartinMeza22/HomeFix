export interface ConversationMessage {
  id: string
  sender: 'user' | 'worker'
  text: string
  timestamp: string
}

export interface Conversation {
  id: string
  workerId: string
  workerName: string
  lastMessage: string
  lastMessageTime: string
  unread: number
  messages: ConversationMessage[]
}

export const conversations: Conversation[] = [
  {
    id: 'c1',
    workerId: '1',
    workerName: 'Pedro Picapiedra',
    lastMessage: 'Dale, nos vemos el sábado a las 10',
    lastMessageTime: '2024-04-17T15:30:00',
    unread: 0,
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Hola Pedro, necesito arreglar un caño roto en la cocina',
        timestamp: '2024-04-16T10:00:00'
      },
      {
        id: 'm2',
        sender: 'worker',
        text: '¡Hola! Sí, dale, no hay drama. ¿Cuándo te viene bien?',
        timestamp: '2024-04-16T10:15:00'
      },
      {
        id: 'm3',
        sender: 'user',
        text: 'El próximo sábado a la mañana',
        timestamp: '2024-04-16T10:30:00'
      },
      {
        id: 'm4',
        sender: 'worker',
        text: 'Dale, nos vemos el sábado a las 10',
        timestamp: '2024-04-17T15:30:00'
      }
    ]
  },
  {
    id: 'c2',
    workerId: '2',
    workerName: 'Valentina Ríos',
    lastMessage: 'Me fijo y te aviso',
    lastMessageTime: '2024-04-15T12:00:00',
    unread: 1,
    messages: [
      {
        id: 'm5',
        sender: 'user',
        text: 'Hola Valentina, tengo una pérdida en el baño',
        timestamp: '2024-04-15T11:00:00'
      },
      {
        id: 'm6',
        sender: 'worker',
        text: 'Entiendo, puedo ir pronto. ¿Es muy urgente?',
        timestamp: '2024-04-15T11:20:00'
      },
      {
        id: 'm7',
        sender: 'user',
        text: 'No es para ya, pero necesito que vengas pronto',
        timestamp: '2024-04-15T11:40:00'
      },
      {
        id: 'm8',
        sender: 'worker',
        text: 'Me fijo y te aviso',
        timestamp: '2024-04-15T12:00:00'
      }
    ]
  }
]
