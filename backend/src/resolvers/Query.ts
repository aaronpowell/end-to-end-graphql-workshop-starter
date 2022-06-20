import { UserInputError } from "apollo-server";
import { QueryResolvers } from "../generated/graphql";

export const Query: QueryResolvers = {
  async game(_, { id }, context) {
    const game = await context.dataSources.games.getGame(id);

    if (!game) {
      throw new UserInputError(`The ID ${id} does not match a known game`);
    }

    return game;
  },

  games(_, __, context) {
    return context.dataSources.games.getGames();
  },
};
