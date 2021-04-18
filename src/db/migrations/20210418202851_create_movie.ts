import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TABLE movie (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(220) NOT NULL,
      synopsis VARCHAR(2500) NULL,
      release_date DATE NOT NULL,
      runtime INT(3) UNSIGNED NOT NULL,

      CONSTRAINT PK_movie__id PRIMARY KEY (id),
      CONSTRAINT UK_movie__movie UNIQUE KEY (name, release_date, runtime)
  );`)
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('DROP TABLE movie;')
}