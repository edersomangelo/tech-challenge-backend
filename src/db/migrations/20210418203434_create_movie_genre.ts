import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
  CREATE TABLE movie_genre (
    movie_id INT UNSIGNED NOT NULL,
    genre_id INT UNSIGNED NOT NULL,

    CONSTRAINT PK_movie_genre__id PRIMARY KEY (movie_id,genre_id),
    CONSTRAINT FK_movie_genre__movie FOREIGN KEY (movie_id) REFERENCES movie(id),
    CONSTRAINT FK_movie_genre__genre FOREIGN KEY (genre_id) REFERENCES genre(id)
  );`)
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('DROP TABLE movie_genre;')
}