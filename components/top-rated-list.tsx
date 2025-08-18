"use client"

import type { Review } from "@/app/page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Trophy, MapPin, User } from "lucide-react"

interface TopRatedListProps {
  reviews: Review[]
}

export function TopRatedList({ reviews }: TopRatedListProps) {
  // Agrupar resenhas por restaurante e calcular média
  const restaurantStats = reviews.reduce(
    (acc, review) => {
      const name = review.restaurantName
      if (!acc[name]) {
        acc[name] = {
          name,
          reviews: [],
          totalRating: 0,
          averageRating: 0,
        }
      }
      acc[name].reviews.push(review)
      acc[name].totalRating += review.rating
      acc[name].averageRating = acc[name].totalRating / acc[name].reviews.length
      return acc
    },
    {} as Record<
      string,
      {
        name: string
        reviews: Review[]
        totalRating: number
        averageRating: number
      }
    >,
  )

  // Ordenar por média de avaliação (decrescente) e depois por número de resenhas
  const topRated = Object.values(restaurantStats)
    .sort((a, b) => {
      if (b.averageRating !== a.averageRating) {
        return b.averageRating - a.averageRating
      }
      return b.reviews.length - a.reviews.length
    })
    .slice(0, 10) // Top 10

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < fullStars
                ? "text-yellow-500 fill-current"
                : i === fullStars && hasHalfStar
                  ? "text-yellow-500 fill-current opacity-50"
                  : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  const getRankingIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (index === 1) return <Trophy className="h-5 w-5 text-gray-400" />
    if (index === 2) return <Trophy className="h-5 w-5 text-amber-600" />
    return <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
  }

  if (topRated.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nenhum restaurante avaliado ainda</CardTitle>
          <CardDescription>Adicione algumas resenhas para ver o ranking dos mais bem avaliados!</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-6 w-6 text-yellow-500" />
        <h2 className="text-2xl font-bold">Restaurantes Mais Bem Avaliados</h2>
      </div>

      {topRated.map((restaurant, index) => (
        <Card key={restaurant.name} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {getRankingIcon(index)}
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    {renderStars(restaurant.averageRating)}
                    <Badge variant="secondary">{restaurant.averageRating.toFixed(1)}/5</Badge>
                    <span className="text-sm text-muted-foreground">
                      ({restaurant.reviews.length} {restaurant.reviews.length === 1 ? "resenha" : "resenhas"})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Resenhas Recentes:</h4>
              {restaurant.reviews.slice(0, 2).map((review) => (
                <div key={review.id} className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm font-medium">{review.reviewer}</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{review.comment}</p>
                </div>
              ))}
              {restaurant.reviews.length > 2 && (
                <p className="text-xs text-muted-foreground">+{restaurant.reviews.length - 2} resenhas adicionais</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
