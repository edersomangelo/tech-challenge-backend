import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('actor').insert([
    {
      id: 1,
      name: 'Leonardo DiCaprio',
      bio: 'Leonardo DiCaprio is an actor known for his edgy, unconventional roles. He started out in television before moving on to film, scoring an Oscar nomination for his role in What\'s Eating Gilbert Grape (1993). In 1997, DiCaprio starred in James Cameron\'s epic drama Titanic, which made him a star. The actor has also paired up with iconic director Martin Scorsese for several projects, including The Aviator (2004) and The Departed (2006). His more recent films include Inception (2010), Django Unchained (2012), The Wolf of Wall Street (2013) and The Revenant (2015), winning his first Oscar for the latter.',
      born_date: '1974-11-11'
    },
    {
      id: 2,
      name: 'Al Pacino',
      bio: 'Alfredo James Pacino is an American actor and filmmaker. In a career spanning over five decades, he has received many awards and nominations, including an Academy Award, two Tony Awards, and two Primetime Emmy Awards. He is one of the few performers to have received the Triple Crown of Acting. He has also been honored with the AFI Life Achievement Award, the Cecil B. DeMille Award, and the National Medal of Arts. A method actor and former student of the HB Studio and the Actors Studio, where he was taught by Charlie Laughton and Lee Strasberg, Pacino\'s film debut came at the age of 29 with a minor role in Me, Natalie (1969). He gained favorable notice for his first lead role as a heroin addict in The Panic in Needle Park (1971). Wide acclaim and recognition came with his breakthrough role as Michael Corleone in Francis Ford Coppola\'s The Godfather (1972), for which he received his first Oscar nomination, and he would reprise the role in the sequels The Godfather Part II (1974) and The Godfather Part III (1990).',
      born_date: '1940-04-25'
    },
    {
      id: 3,
      name: 'Ederson Angelo',
      bio: 'This is me!',
      born_date: '1983-10-10'
    }
  ])
}
