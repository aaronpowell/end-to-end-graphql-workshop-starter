import { CosmosClient } from "@azure/cosmos";
import { DataSources } from "apollo-server-core/src/graphqlOptions";
import { ApolloContext } from "../apolloContext";
import { QuestionDataSource as CosmosQuestionDataSource } from "./cosmos/QuestionDataSource";
import { QuestionDataSource as InMemoryQuestionDataSource } from "./inMemory/QuestionDataSource";
import { GameDataSource as InMemoryGameDataSource } from "./inMemory/GameDataSource";
import { PlayerDataSource as InMemoryPlayerDataSource } from "./inMemory/PlayerDataSource";

export const cosmosDataSource: () => DataSources<ApolloContext> = () => {
  const client = new CosmosClient(process.env.CosmosDB || "");
  const container = client
    .database(process.env.DATABASE_NAME || "trivia")
    .container(process.env.CONTAINER_NAME || "game");

  return {
    questions: new CosmosQuestionDataSource(container),
  };
};

export const inMemoryDataSource: () => DataSources<ApolloContext> = () => {
  return {
    questions: new InMemoryQuestionDataSource(),
    games: new InMemoryGameDataSource(),
    players: new InMemoryPlayerDataSource(),
  };
};
