import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TABLE movie_character (
      id  INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      name  VARCHAR(150) NOT NULL,
      movie_id INT UNSIGNED NOT NULL,
      actor_id INT UNSIGNED NOT NULL,

      CONSTRAINT PK_character__id PRIMARY KEY (id),
      CONSTRAINT UK_character__character UNIQUE KEY (name, movie_id, actor_id),
      CONSTRAINT FK_actor FOREIGN KEY (actor_id) REFERENCES actor(id),
      CONSTRAINT FK_movie FOREIGN KEY (movie_id) REFERENCES movie(id)
  );`)
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('DROP TABLE movie_character;')
}
