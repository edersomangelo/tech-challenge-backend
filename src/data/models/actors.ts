export interface Actor {
  id?: number
  name: string
  bio: string
  born_date: Date
}

export interface PayloadActor {
  id?: Actor['id']
  name: Actor['name']
  bio: Actor['bio']
  bornAt: Actor['born_date']
}
