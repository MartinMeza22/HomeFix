'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SearchFormProps {
  onSearch?: (query: string, category: string, location: string) => void
  categories?: { id: string; name: string }[]
}

export function SearchForm({ onSearch, categories = [] }: SearchFormProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query, category, location)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            ¿Qué necesitas?
          </label>
          <Input
            placeholder="Electricista, Plomero..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Categoría
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-white text-foreground"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Ubicación
          </label>
          <Input
            placeholder="Tu zona..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-white"
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
        Buscar Profesionales
      </Button>
    </form>
  )
}
