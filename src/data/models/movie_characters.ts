export interface MovieCharacters {
  id?: number
  name: string
  movie_id: number
  actor_id: number
}

export interface PayloadMovieCharacters {
  id?: MovieCharacters['id']
  name: MovieCharacters['name']
  movieId: MovieCharacters['movie_id']
  actorId: MovieCharacters['actor_id']
}
