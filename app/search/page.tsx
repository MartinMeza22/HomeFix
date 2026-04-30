'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WorkerCard } from '@/components/WorkerCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { workers, type Worker } from '@/lib/data/workers'
import { categories } from '@/lib/data/categories'
import { Search, Filter, MapPin } from 'lucide-react'

export default function SearchPage() {
  const router = useRouter()
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>(workers)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedRating, setSelectedRating] = useState('')
  const [location, setLocation] = useState('')
  const [sortBy, setSortBy] = useState('distance')
  const [isClient, setIsClient] = useState(false)

  // Only run on client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Apply filters
  useEffect(() => {
    let result = [...workers]

    // Filter by category
    if (selectedCategory) {
      const selectedCat = categories.find(c => c.id === selectedCategory)
      if (selectedCat) {
        result = result.filter(w => w.category === selectedCat.name)
      }
    }

    // Filter by location
    if (location) {
      result = result.filter(w =>
        w.location.toLowerCase().includes(location.toLowerCase())
      )
    }

    // Filter by rating
    if (selectedRating) {
      const minRating = parseFloat(selectedRating)
      result = result.filter(w => w.rating >= minRating)
    }

    // Sort results
    switch (sortBy) {
      case 'distance':
        result.sort((a, b) => a.distance - b.distance)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'price-low':
        result.sort((a, b) => a.hourlyRate - b.hourlyRate)
        break
      case 'price-high':
        result.sort((a, b) => b.hourlyRate - a.hourlyRate)
        break
    }

    setFilteredWorkers(result)
  }, [selectedCategory, location, selectedRating, sortBy])

  const handleWorkerSelect = (workerId: string) => {
    router.push(`/worker/${workerId}`)
  }

  const clearFilters = () => {
    setSelectedCategory('')
    setLocation('')
    setSelectedRating('')
    setSortBy('distance')
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-primary mb-3">
            <Search className="w-4 h-4" />
            <span className="font-medium">Busqueda de profesionales</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Profesionales verificados cerca de ti
          </h1>
          <p className="text-muted-foreground">
            {filteredWorkers.length} profesional{filteredWorkers.length !== 1 ? 'es' : ''} disponible{filteredWorkers.length !== 1 ? 's' : ''} en tu zona
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold text-foreground">Filtros</h2>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Ubicacion</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Zona, ciudad..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-background pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Categoría</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Calificación Mínima</label>
                  <div className="space-y-2">
                    {[4, 4.5, 4.7, 4.9].map((rating) => (
                      <label key={rating} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={selectedRating === rating.toString()}
                          onChange={(e) => setSelectedRating(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-foreground">
                          {rating}★ y superior
                        </span>
                      </label>
                    ))}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value=""
                        checked={selectedRating === ''}
                        onChange={() => setSelectedRating('')}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-foreground">Todos</span>
                    </label>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearFilters}
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sort Options */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredWorkers.length} resultado{filteredWorkers.length !== 1 ? 's' : ''}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-input rounded-md bg-card text-foreground text-sm"
              >
                <option value="distance">Más Cercanos</option>
                <option value="rating">Mejor Calificados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
            </div>

            {/* Workers Grid */}
            {filteredWorkers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkers.map((worker) => (
                  <WorkerCard
                    key={worker.id}
                    worker={worker}
                    onSelect={handleWorkerSelect}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No se encontraron profesionales con estos criterios.
                </p>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={clearFilters}
                >
                  Limpiar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
