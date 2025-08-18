"use client"

import type React from "react"

import { useState } from "react"
import type { Review } from "@/app/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"

interface EditReviewFormProps {
  review: Review
  onSubmit: (review: Partial<Review>) => void
  onCancel: () => void
}

export function EditReviewForm({ review, onSubmit, onCancel }: EditReviewFormProps) {
  const [formData, setFormData] = useState({
    restaurantName: review.restaurantName,
    rating: review.rating,
    comment: review.comment,
    reviewer: review.reviewer,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.restaurantName && formData.rating > 0 && formData.comment && formData.reviewer) {
      onSubmit(formData)
    }
  }

  const handleStarClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg">Editar Resenha</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="restaurant-edit">Nome do Restaurante</Label>
            <Input
              id="restaurant-edit"
              value={formData.restaurantName}
              onChange={(e) => setFormData((prev) => ({ ...prev, restaurantName: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reviewer-edit">Seu Nome</Label>
            <Input
              id="reviewer-edit"
              value={formData.reviewer}
              onChange={(e) => setFormData((prev) => ({ ...prev, reviewer: e.target.value }))}
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
            <Label htmlFor="comment-edit">Comentário</Label>
            <Textarea
              id="comment-edit"
              value={formData.comment}
              onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
              rows={4}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Salvar Alterações
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
