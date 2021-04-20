export interface Genre {
  id?: number
  name: string
}

export interface GenreWithAmount extends Genre {
  occurrences_amount: number
}
