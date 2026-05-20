# 🤖 Contexto del Proyecto para Agentes de IA (AGENTS.md)

Este documento define el contexto, las reglas de arquitectura, el modelo de datos y las restricciones para cualquier agente de IA que asista en el desarrollo de **HomeFix**.

---

## 🎯 Visión General del Proyecto
**HomeFix** es una plataforma moderna que conecta clientes con profesionales calificados para servicios de reparación a domicilio.
* **Core features:** Búsqueda inteligente, diagnóstico asistido por IA (Wizard), chat integrado, sistema de reputación y botón de emergencia SOS.

---

## 🛠️ Stack Tecnológico y Arquitectura de Datos
* **Framework:** Next.js 16 (App Router, React 19).
* **Language:** TypeScript (Tipado estricto obligatorio).
* **Styling & UI:** Tailwind CSS + `shadcn/ui` (Radix UI).
* **ORM:** Prisma Client (Para consultas seguras y tipos autogenerados).
* **Database:** Conexión activa a Base de Datos relacional (PostgreSQL/MySQL).

---

## 🗄️ Estrategia de Acceso a Datos (BDD)

Para interactuar con la base de datos, seguí estrictamente estas reglas de Next.js Architecture:

1. **Server Components (Por defecto):** Realizá las consultas de Prisma (`prisma.worker.findMany()`, etc.) directamente en los archivos `page.tsx` o `layout.tsx` del servidor de la carpeta `/app`. No uses Fetch/Axios internos para endpoints de API propios si podés consultar la BDD directamente en el servidor.
2. **Server Actions:** Para mutaciones de datos (crear un turno, enviar un mensaje, registrar un usuario), creá funciones asíncronas con la directiva `"use server"` dentro de una carpeta `/app/actions/` o junto al componente.
3. **Instancia de Prisma:** Importá siempre el cliente desde `@/lib/prisma` (evita múltiples instancias en desarrollo).

---

## 📂 Arquitectura del Directorio Actualizada

```text
├── app/                      # Rutas e Interfaces (App Router)
│   ├── actions/              # Server Actions para mutaciones (BDD)
│   │   ├── bookings.ts       # Crear/actualizar turnos en BDD
│   │   └── messages.ts       # Guardar mensajes del chat
│   ├── page.tsx              # Landing page (Server Component - Carga categorías)
│   ├── search/               # Búsqueda de profesionales (Server Component - Filtros Prisma)
│   ├── worker/[id]/          # Perfil dinámico (Carga datos del trabajador desde BDD)
│   ├── diagnostico/          # Wizard de diagnóstico en 3 pasos
│   ├── dashboard/            # Panel del cliente (Carga turnos y chats del usuario)
│   ├── layout.tsx            # Layout raíz
│   └── globals.css           # Estilos globales y variables CSS
├── components/               # Componentes de la Interfaz (UI)
│   ├── ui/                   # Primitivos de shadcn/ui
│   ├── Navbar.tsx            # Navegación principal (Responsive)
│   ├── SearchForm.tsx        # Formulario de filtros (Client Component)
│   ├── WorkerCard.tsx        # Tarjeta de visualización de profesionales
│   ├── DiagnosticoWizard.tsx # Wizard de 3 pasos e integración con IA
│   └── SOS.tsx               # Botón flotante de emergencia
├── lib/
│   └── prisma.ts             # Cliente global de Prisma (Singleton)
└── prisma/
    └── schema.prisma         # Esquema y modelos de la Base de Datos
```

---

## 📐 Modelos de Entidades (Esquema Conceptual)

Al escribir consultas de Prisma, tené en cuenta las siguientes relaciones del modelo:

* **User / Worker:** Un usuario puede ser cliente o profesional (Worker). El Worker tiene campos extra como `bio`, `hourlyRate`, `experience`, `verified` (boolean).
* **Category:** Las profesiones (Plomería, Electricidad, etc.). Un Worker pertenece a una o más categorías.
* **Booking (Turnos):** Conecta a un Cliente con un Worker. Campos: `date`, `status` (`PENDING`, `CONFIRMED`, `IN_PROGRESS`, `COMPLETED`).
* **Review:** Conecta un `Booking` finalizado con una calificación (`rating` 1-5) y un comentario.
* **Chat / Message:** Conversaciones en tiempo real entre Clientes y Workers.

---

## 🎨 Sistema de Diseño (Design Tokens)

Usa exclusivamente estas variables CSS integradas con Tailwind:
* **Primary:** `#0066CC` (Azul profesional / Botones de acción)
* **Background:** `#FFFFFF` | **Foreground:** `#141414` (Texto oscuro)
* **Secondary:** `#F5F5F5` | **Muted:** `#EFEFEF` | **Border:** `#E8E8E8`
* **Tipografía:** Geist (sans-serif). Títulos: `font-bold` (700). Cuerpo: `font-normal` (400).

---

## 🧠 Reglas de Comportamiento para la IA

1. **Manejo de Errores en BDD:** Envuelve siempre las consultas de Prisma en bloques `try/catch`. En los Server Components, usa componentes `error.tsx` de Next.js para capturar fallos de conexión de manera elegante.
2. **Seguridad de Tipos:** No uses `any`. Aprovecha los tipos generados automáticamente por Prisma (ej. `WorkerWithRelations`, `BookingStatus`).
3. **Optimización de Consultas:** Usa `include` de Prisma con moderación para evitar problemas de rendimiento ($N+1$). Trae solo los campos necesarios mediante `select` si la consulta es muy pesada.
4. **Directiva de Componentes:** Mantén los componentes de UI como Server Components por defecto. Agrega `"use client"` únicamente si manejas estados locales (`useState`), efectos (`useEffect`) o eventos del navegador.
