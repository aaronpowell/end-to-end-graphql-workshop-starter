import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { ApolloContext } from "../../apolloContext";
import { GameState } from "../../generated/graphql";
import { arrayRandomiser, idGenerator } from "../../utils";
import { IGameDataSource, GameModel, QuestionModel, ModelType } from "../types";

export class GameDataSource
  extends CosmosDataSource<GameModel, ApolloContext>
  implements IGameDataSource
{
  async getUserGames(userId: string) {
    const response = await this.findManyByQuery({
      query: `
              SELECT *
              FROM c
              WHERE c.modelType = @type
              AND EXISTS(SELECT p.id FROM p IN c.players WHERE p.id = @id)`,
      parameters: [
        { name: "@id", value: userId },
        { name: "@type", value: ModelType.Game },
      ],
    });

    return response.resources;
  }

  async getGames() {
    const games = await this.findManyByQuery({
      query: "SELECT * FROM c WHERE c.modelType = @type",
      parameters: [{ name: "@type", value: ModelType.Game }],
    });

    return games.resources;
  }

  async getGame(id: string) {
    const game = await this.findManyByQuery({
      query: "SELECT TOP 1 * FROM c WHERE c.id = @id AND c.modelType = @type",
      parameters: [
        { name: "@id", value: id },
        { name: "@type", value: ModelType.Game },
      ],
    });

    return game.resources[0];
  }

  async createGame(questions: QuestionModel[]): Promise<GameModel> {
    const newGame: GameModel = {
      id: idGenerator(),
      modelType: ModelType.Game,
      state: GameState.WaitingForPlayers,
      players: [],
      answers: [],
      questions: arrayRandomiser(questions),
    };

    const savedGame = await this.createOne(newGame);

    if (savedGame.statusCode !== 201 || !savedGame.resource) {
      throw "Failed to save game";
    }

    return savedGame.resource;
  }
  updateGame(game: GameModel): Promise<GameModel> {
    throw new Error("Method not implemented.");
  }
}
