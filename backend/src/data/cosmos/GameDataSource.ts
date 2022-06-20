import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { ApolloContext } from "../../apolloContext";
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

  createGame(questions: QuestionModel[]): Promise<GameModel> {
    throw new Error("Method not implemented.");
  }
  updateGame(game: GameModel): Promise<GameModel> {
    throw new Error("Method not implemented.");
  }
}
