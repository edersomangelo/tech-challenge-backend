import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('movie').insert([
    {
      id: 1,
      name: 'Night of the Day of the Dawn of the Son of the Bride of the Return of the Revenge of the Terror of the Attack of the Evil Mutant Hellbound Flesh Eating Crawling Alien Zombified Subhumanoid Living Dead, Part 5',
      synopsis: 'A comedic parody of the golden age of television, where episodes of "Bonanza" and "The Andy Griffith Show" have their original soundtracks wiped out (a la "What\'s Up Tiger Lily), and replaced with more "updated" story and dialog for today\'s depraved TV schedule. Hosted by "Insectavora" (AKA Angelica Velez). Written by Yazujian, Mark',
      release_date: '2011-11-27',
      runtime: 50
    },
    {
      id: 2,
      name: 'The Godfather',
      synopsis: 'In late summer 1945, guests are gathered for the wedding reception of Don Vito Corleone\'s daughter Connie (Talia Shire) and Carlo Rizzi (Gianni Russo). Vito (Marlon Brando), the head of the Corleone Mafia family, is known to friends and associates as "Godfather." He and Tom Hagen (Robert Duvall), the Corleone family lawyer, are hearing requests for favors because, according to Italian tradition, "no Sicilian can refuse a request on his daughter\'s wedding day." One of the men who asks the Don for a favor is Amerigo Bonasera, a successful mortician and acquaintance of the Don, whose daughter was brutally beaten by two young men because she refused their advances; the men received minimal punishment from the presiding judge. The Don is disappointed in Bonasera, who\'d avoided most contact with the Don due to Corleone\'s nefarious business dealings. The Don\'s wife is godmother to Bonasera\'s shamed daughter, a relationship the Don uses to extract new loyalty from the undertaker. The Don agrees to have his men punish the young men responsible (in a non-lethal manner) in return for future service if necessary.',
      release_date: '1972-03-14',
      runtime: 175
    },
    {
      id: 3,
      name: 'Titanic',
      synopsis: 'In 1996, treasure hunter Brock Lovett and his team board the research vessel Akademik Mstislav Keldysh to search the wreck of RMS Titanic for a necklace with a rare diamond, the Heart of the Ocean. They recover a safe containing a drawing of a young woman wearing only the necklace dated April 14, 1912, the day the ship struck the iceberg.[Note 1] Rose Dawson Calvert, the woman in the drawing, is brought aboard Keldysh and tells Lovett of her experiences aboard Titanic.',
      release_date: '1997-11-01',
      runtime: 195
    },
    {
      id: 4,
      name: 'The Departed',
      synopsis: 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.',
      release_date: '2006-09-26',
      runtime: 151
    }
  ])
}
