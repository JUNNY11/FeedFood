"use client"

import { useState } from "react"
import type { Review } from "@/app/page"
import { ReviewCard } from "./review-card"
import { EditReviewForm } from "./edit-review-form"

interface RestaurantListProps {
  reviews: Review[]
  onUpdate: (id: string, review: Partial<Review>) => void
  onDelete: (id: string) => void
}

export function RestaurantList({ reviews, onUpdate, onDelete }: RestaurantListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleUpdate = (id: string, updatedReview: Partial<Review>) => {
    onUpdate(id, updatedReview)
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id}>
          {editingId === review.id ? (
            <EditReviewForm
              review={review}
              onSubmit={(updatedReview) => handleUpdate(review.id, updatedReview)}
              onCancel={handleCancelEdit}
            />
          ) : (
            <ReviewCard review={review} onEdit={() => handleEdit(review.id)} onDelete={() => onDelete(review.id)} />
          )}
        </div>
      ))}
    </div>
  )
}
