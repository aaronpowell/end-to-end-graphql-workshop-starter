import { MutationResolvers } from "../generated/graphql";

export const Mutation: MutationResolvers = {
  async createGame(_, __, { dataSources }) {
    const questions = await dataSources.questions.getQuestions();
    return dataSources.games.createGame(questions);
  },
};
