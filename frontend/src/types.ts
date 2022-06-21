export type GameRoute = {
  id: string;
};

export type PlayerRoute = GameRoute & { player: string };
