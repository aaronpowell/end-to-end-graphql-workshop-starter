import { DataSource } from "apollo-datasource";
import { IPlayerDataSource, ModelType, PlayerModel } from "../types";

export class PlayerDataSource extends DataSource implements IPlayerDataSource {
  #players: PlayerModel[];

  constructor(players: PlayerModel[]) {
    super();
    this.#players = players;
  }

  getPlayer(id: string): Promise<PlayerModel | undefined> {
    return Promise.resolve(this.#players.find((p) => p.id === id));
  }
  createPlayer(
    id: string,
    name: string,
    identityProvider: string,
    userDetails: string,
    userRoles: string[]
  ): Promise<PlayerModel> {
    const player: PlayerModel = {
      id,
      name,
      identityProvider,
      userDetails,
      userRoles,
      modelType: ModelType.Player
    };

    this.#players.push(player);

    return Promise.resolve(player);
  }
}
