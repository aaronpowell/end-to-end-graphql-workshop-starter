import "dotenv/config";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { join } from "path";
import { resolvers } from "./resolvers";
import { inMemoryDataSource, cosmosDataSource } from "./data";

const typeDefs = loadFilesSync(join(__dirname, "..", "schema.graphql"));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  dataSources: process.env.CosmosDB ? cosmosDataSource : inMemoryDataSource,
});

server.listen().then((info) => {
  console.log(`Server is running at ${info.url}`);
});
