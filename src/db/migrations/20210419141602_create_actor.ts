import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TABLE actor (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(120) NOT NULL,
      bio VARCHAR(2500) NULL,
      born_date DATE NOT NULL,

      CONSTRAINT PK_actor__id PRIMARY KEY (id),
      CONSTRAINT UK_actor__name UNIQUE KEY (name)
  );`)
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('DROP TABLE actor;')
}
