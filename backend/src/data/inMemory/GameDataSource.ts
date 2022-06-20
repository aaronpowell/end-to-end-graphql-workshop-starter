import { DataSource } from "apollo-datasource";
import type { GameModel, IGameDataSource, QuestionModel } from "../types";

export class GameDataSource extends DataSource implements IGameDataSource {
  getGames(): Promise<GameModel[]> {
    return Promise.resolve(this.#games);
  }
  getGame(id: string): Promise<GameModel | undefined> {
    return Promise.resolve(this.#games.find((g) => g.id === id));
  }
  createGame(questions: QuestionModel[]): Promise<GameModel> {
    throw new Error("Method not implemented.");
  }
  updateGame(game: GameModel): Promise<GameModel> {
    throw new Error("Method not implemented.");
  }
  getUserGames(userId: string): Promise<GameModel[]> {
    return Promise.resolve(
      this.#games.filter((g) => g.players.some((u) => u.id === userId))
    );
  }
  #games: GameModel[] = [];
}
