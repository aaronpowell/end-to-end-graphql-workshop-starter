import {
  IGameDataSource,
  IPlayerDataSource,
  IQuestionDataSource,
} from "./data/types";

export type ApolloContext = {
  dataSources: {
    players: IPlayerDataSource;
    games: IGameDataSource;
    questions: IQuestionDataSource;
  };
};
