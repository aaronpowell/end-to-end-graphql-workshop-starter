import { DataSource } from "apollo-datasource";
import { IPlayerDataSource, PlayerModel } from "../types";

export class PlayerDataSource extends DataSource implements IPlayerDataSource {
  #players: PlayerModel[] = [];

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
    throw new Error("Method not implemented.");
  }
}
