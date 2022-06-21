import { CosmosClient } from "@azure/cosmos";
import { DataSources } from "apollo-server-core/src/graphqlOptions";
import { ApolloContext } from "../apolloContext";
import { QuestionDataSource as CosmosQuestionDataSource } from "./cosmos/QuestionDataSource";
import { GameDataSource as CosmosGameDataSource } from "./cosmos/GameDataSource";
import { PlayerDataSource as CosmosPlayerDataSource } from "./cosmos/PlayerDataSource";
import { QuestionDataSource as InMemoryQuestionDataSource } from "./inMemory/QuestionDataSource";
import { GameDataSource as InMemoryGameDataSource } from "./inMemory/GameDataSource";
import { PlayerDataSource as InMemoryPlayerDataSource } from "./inMemory/PlayerDataSource";
import { GameModel, PlayerModel } from "./types";

export const cosmosDataSource: () => DataSources<ApolloContext> = () => {
  const client = new CosmosClient(process.env.CosmosDB || "");
  const container = client
    .database(process.env.DATABASE_NAME || "trivia")
    .container(process.env.CONTAINER_NAME || "game");

  return {
    questions: new CosmosQuestionDataSource(container),
    games: new CosmosGameDataSource(container),
    players: new CosmosPlayerDataSource(container),
  };
};

const games: GameModel[] = [];
const players: PlayerModel[] = [];
export const inMemoryDataSource: () => DataSources<ApolloContext> = () => {
  return {
    questions: new InMemoryQuestionDataSource(),
    games: new InMemoryGameDataSource(games),
    players: new InMemoryPlayerDataSource(players),
  };
};
