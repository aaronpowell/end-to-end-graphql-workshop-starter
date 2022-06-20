import { CosmosDataSource } from "apollo-datasource-cosmosdb";
import { ApolloContext } from "../../apolloContext";
import { IPlayerDataSource, PlayerModel } from "../types";

export class PlayerDataSource
  extends CosmosDataSource<PlayerModel, ApolloContext>
  implements IPlayerDataSource
{
  createPlayer(
    id: string,
    name: string,
    identityProvider: string,
    userDetails: string,
    userRoles: string[]
  ): Promise<PlayerModel> {
    throw new Error("Method not implemented.");
  }
  async getPlayer(id: string) {
    return await this.findOneById(id);
  }
}
