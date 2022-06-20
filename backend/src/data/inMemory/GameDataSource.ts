import { DataSource } from "apollo-datasource";
import { GameState } from "../../generated/graphql";
import { idGenerator } from "../../utils";
import { GameModel, IGameDataSource, ModelType, QuestionModel } from "../types";

export class GameDataSource extends DataSource implements IGameDataSource {
  constructor(games: GameModel[]) {
    super();
    this.#games = games;
  }
  getGames(): Promise<GameModel[]> {
    return Promise.resolve(this.#games);
  }
  getGame(id: string): Promise<GameModel | undefined> {
    return Promise.resolve(this.#games.find((g) => g.id === id));
  }
  createGame(questions: QuestionModel[]): Promise<GameModel> {
    const game = {
      id: idGenerator(),
      questions,
      answers: [],
      players: [],
      state: GameState.WaitingForPlayers,
      modelType: ModelType.Game,
    };
    this.#games.push(game);

    return Promise.resolve(game);
  }
  updateGame(game: GameModel): Promise<GameModel> {
    throw new Error("Method not implemented.");
  }
  getUserGames(userId: string): Promise<GameModel[]> {
    return Promise.resolve(
      this.#games.filter((g) => g.players.some((u) => u.id === userId))
    );
  }
  #games: GameModel[];
}
