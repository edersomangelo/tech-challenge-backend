export interface Movie {
  id?: number
  name: string
  synopsis?: string
  release_date: Date
  runtime: number
}

export interface PayloadMovie {
  id?: Movie['id']
  name: Movie['name']
  synopsis?: Movie['synopsis']
  releasedAt: Movie['release_date']
  runtime: Movie['runtime']
  genres?: Array<string|number>
}
