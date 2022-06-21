import { UserInputError } from "apollo-server";
import { ModelType } from "../data/types";
import { GameState, MutationResolvers } from "../generated/graphql";
import { idGenerator } from "../utils";

export const Mutation: MutationResolvers = {
  async createGame(_, __, { dataSources }) {
    const questions = await dataSources.questions.getQuestions();
    return dataSources.games.createGame(questions);
  },
  async startGame(_, { gameId }, { dataSources }) {
    const game = await dataSources.games.getGame(gameId);

    if (!game) {
      throw new UserInputError(`The game ${gameId} does not exist`);
    }

    game.state = GameState.Started;
    return await dataSources.games.updateGame(game);
  },

  async endGame(_, { gameId }, { dataSources }) {
    const game = await dataSources.games.getGame(gameId);

    if (!game) {
      throw new UserInputError(`The game ${gameId} does not exist`);
    }

    game.state = GameState.Completed;
    return await dataSources.games.updateGame(game);
  },

  async addPlayerToGame(_, { gameId, playerName }, { dataSources }) {
    const game = await dataSources.games.getGame(gameId);

    if (!game) {
      throw new UserInputError(`The game ${gameId} does not exist`);
    }

    let player = await dataSources.players.getPlayer(playerName);

    if (!player) {
      player = await dataSources.players.createPlayer(
        playerName,
        playerName,
        "",
        "",
        []
      );
    }

    game.players.push(player);

    await dataSources.games.updateGame(game);

    return player;
  },

  async submitAnswer(_, { answer }, { dataSources }) {
    const game = await dataSources.games.getGame(answer.gameId);

    if (!game) {
      throw new UserInputError(`The game ${answer.gameId} does not exist`);
    }

    const player = await dataSources.players.getPlayer(answer.playerId);

    if (!player || !game.players.some((p) => p.id === answer.playerId)) {
      throw new UserInputError(
        `The user ${answer.playerId} does not exist for this game.`
      );
    }

    const question = await dataSources.questions.getQuestion(answer.questionId);

    if (!question || !game.questions.some((q) => q.id === answer.questionId)) {
      throw new UserInputError(
        `The question does not exist for the current game.`
      );
    }

    game.answers.push({
      answer: answer.answer,
      question,
      player,
      id: idGenerator(),
      modelType: ModelType.PlayerAnswer,
    });

    return await dataSources.games.updateGame(game);
  },
};
