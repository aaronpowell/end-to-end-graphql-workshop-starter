import { UserInputError } from "apollo-server";
import { QueryResolvers } from "../generated/graphql";
import { arrayRandomiser } from "../utils";

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

  async playerAnswers(_, { gameId, playerId }, { dataSources }) {
    const game = await dataSources.games.getGame(gameId);

    if (!game) {
      throw new UserInputError(`The ID ${gameId} does not match a known game`);
    }

    if (!game.players.some((p) => p.id === playerId)) {
      throw new UserInputError(`The player does not exist in this game`);
    }

    return game.answers
      .filter((a) => a.player.id === playerId)
      .map((a) => ({
        answer: a.answer,
        correct: a.answer === a.question.correct_answer,
        correctAnswer: a.question.correct_answer,
        question: a.question.question,
        answers: arrayRandomiser(
          a.question.incorrect_answers.concat(a.question.correct_answer)
        ),
      }));
  },
};
