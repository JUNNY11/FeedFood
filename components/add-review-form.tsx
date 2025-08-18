"use client"

import type React from "react"

import { useState } from "react"
import type { Review } from "@/app/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, X } from "lucide-react"

interface AddReviewFormProps {
  onSubmit: (review: Omit<Review, "id" | "date">) => void
  onCancel: () => void
}

export function AddReviewForm({ onSubmit, onCancel }: AddReviewFormProps) {
  const [formData, setFormData] = useState({
    restaurantName: "",
    rating: 0,
    comment: "",
    reviewer: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.restaurantName && formData.rating > 0 && formData.comment && formData.reviewer) {
      onSubmit(formData)
      setFormData({ restaurantName: "", rating: 0, comment: "", reviewer: "" })
    }
  }

  const handleStarClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Nova Resenha</CardTitle>
            <Button variant="ghost" size="sm" onClick={onCancel} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurant">Nome do Restaurante</Label>
              <Input
                id="restaurant"
                value={formData.restaurantName}
                onChange={(e) => setFormData((prev) => ({ ...prev, restaurantName: e.target.value }))}
                placeholder="Digite o nome do restaurante"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reviewer">Seu Nome</Label>
              <Input
                id="reviewer"
                value={formData.reviewer}
                onChange={(e) => setFormData((prev) => ({ ...prev, reviewer: e.target.value }))}
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Avaliação</Label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleStarClick(i + 1)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        i < formData.rating ? "text-yellow-500 fill-current" : "text-gray-300 hover:text-yellow-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Comentário</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
                placeholder="Conte sobre sua experiência no restaurante..."
                rows={4}
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                Publicar Resenha
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
