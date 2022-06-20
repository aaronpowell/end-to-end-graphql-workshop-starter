import type { Resolvers } from "./generated/graphql";
import { Mutation } from "./resolvers/Mutation";
import { Query } from "./resolvers/Query";
import { Question } from "./resolvers/Question";

export const resolvers: Resolvers = {
  Query,
  Mutation,
  Question,
};
