"use client"

import { useState, useEffect } from "react"
import { RestaurantList } from "@/components/restaurant-list"
import { AddReviewForm } from "@/components/add-review-form"
import { TopRatedList } from "@/components/top-rated-list"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Plus } from "lucide-react"

export interface Review {
  id: string
  restaurantName: string
  rating: number
  comment: string
  date: string
  reviewer: string
}

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [showAddForm, setShowAddForm] = useState(false)

  // Carregar resenhas do localStorage na inicialização
  useEffect(() => {
    const savedReviews = localStorage.getItem("restaurant-reviews")
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    }
  }, [])

  // Salvar resenhas no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem("restaurant-reviews", JSON.stringify(reviews))
  }, [reviews])

  const addReview = (review: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("pt-BR"),
    }
    setReviews((prev) => [newReview, ...prev])
    setShowAddForm(false)
  }

  const updateReview = (id: string, updatedReview: Partial<Review>) => {
    setReviews((prev) => prev.map((review) => (review.id === id ? { ...review, ...updatedReview } : review)))
  }

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-8 w-8 text-yellow-500 fill-current" />
              <h1 className="text-3xl font-bold text-foreground">Resenhas Locais</h1>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Resenha
            </Button>
          </div>
          <p className="text-muted-foreground mt-2">Descubra e avalie os melhores restaurantes da sua região</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="all">Todas as Resenhas</TabsTrigger>
            <TabsTrigger value="top">Mais Bem Avaliados</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {reviews.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Nenhuma resenha ainda</CardTitle>
                  <CardDescription>Seja o primeiro a avaliar um restaurante local!</CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <RestaurantList reviews={reviews} onUpdate={updateReview} onDelete={deleteReview} />
            )}
          </TabsContent>

          <TabsContent value="top">
            <TopRatedList reviews={reviews} />
          </TabsContent>
        </Tabs>

        {showAddForm && <AddReviewForm onSubmit={addReview} onCancel={() => setShowAddForm(false)} />}
      </main>
    </div>
  )
}
