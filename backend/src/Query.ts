import { QueryResolvers } from "./generated/graphql";
import { GameState } from "./generated/graphql";

export const Query: QueryResolvers = {
  game(_, { id }) {
    return {
      id,
      players: [],
      state: GameState.WaitingForPlayers,
      questions: [],
      answers: [],
    };
  },

  games() {
    return [];
  },
};
