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
import { Search, Filter, MapPin, X, ChevronDown } from 'lucide-react'

export default function SearchPage() {
  const router = useRouter()
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>(workers)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedRating, setSelectedRating] = useState('')
  const [location, setLocation] = useState('')
  const [sortBy, setSortBy] = useState('distance')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    let result = [...workers]
    if (selectedCategory) {
      const selectedCat = categories.find(c => c.id === selectedCategory)
      if (selectedCat) result = result.filter(w => w.category === selectedCat.name)
    }
    if (location) {
      result = result.filter(w => w.location.toLowerCase().includes(location.toLowerCase()))
    }
    if (selectedRating) {
      const minRating = parseFloat(selectedRating)
      result = result.filter(w => w.rating >= minRating)
    }
    switch (sortBy) {
      case 'distance': result.sort((a, b) => a.distance - b.distance); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'price-low': result.sort((a, b) => a.hourlyRate - b.hourlyRate); break
      case 'price-high': result.sort((a, b) => b.hourlyRate - a.hourlyRate); break
    }
    setFilteredWorkers(result)
  }, [selectedCategory, location, selectedRating, sortBy])

  const clearFilters = () => {
    setSelectedCategory('')
    setLocation('')
    setSelectedRating('')
    setSortBy('distance')
  }

  const activeFiltersCount = [selectedCategory, selectedRating, location].filter(Boolean).length

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h2 className="font-semibold text-foreground">Filtros</h2>
        </div>
        {activeFiltersCount > 0 && (
          <button onClick={clearFilters} className="text-xs text-accent font-medium flex items-center gap-1">
            <X className="w-3 h-3" /> Limpiar ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Location */}
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

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Categoria</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm"
        >
          <option value="">Todas las categorias</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Calificacion Minima</label>
        <div className="space-y-2">
          {[4, 4.5, 4.7, 4.9].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRating === rating.toString()}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm text-foreground">{rating}★ y superior</span>
            </label>
          ))}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="rating"
              value=""
              checked={selectedRating === ''}
              onChange={() => setSelectedRating('')}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-sm text-foreground">Todos</span>
          </label>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Limpiar Filtros
      </Button>
    </div>
  )

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center gap-2 text-sm text-primary mb-2 sm:mb-3">
            <Search className="w-4 h-4" />
            <span className="font-medium">Busqueda de profesionales</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3">
            Profesionales verificados cerca de ti
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {filteredWorkers.length} profesional{filteredWorkers.length !== 1 ? 'es' : ''} disponible{filteredWorkers.length !== 1 ? 's' : ''} en tu zona
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-sm font-medium text-foreground w-full justify-between"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              <span>Filtros</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-accent text-white text-xs flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Mobile Filters Panel */}
          {filtersOpen && (
            <div className="mt-2 p-4 bg-card border border-border rounded-xl">
              <FiltersContent />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-card border border-border rounded-xl p-6">
                <FiltersContent />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Sort Options */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando <span className="font-semibold text-foreground">{filteredWorkers.length}</span> resultado{filteredWorkers.length !== 1 ? 's' : ''}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-card text-foreground text-sm w-full sm:w-auto"
              >
                <option value="distance">Mas Cercanos</option>
                <option value="rating">Mejor Calificados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
            </div>

            {/* Workers Grid */}
            {filteredWorkers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredWorkers.map((worker) => (
                  <WorkerCard
                    key={worker.id}
                    worker={worker}
                    onSelect={(id) => router.push(`/worker/${id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16 bg-card rounded-xl border border-border">
                <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-lg font-semibold text-foreground mb-2">Sin resultados</p>
                <p className="text-sm text-muted-foreground mb-6">
                  No se encontraron profesionales con estos criterios.
                </p>
                <Button className="bg-accent hover:bg-accent/90 text-white" onClick={clearFilters}>
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
