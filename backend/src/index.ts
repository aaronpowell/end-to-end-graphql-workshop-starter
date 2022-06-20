import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Person {
    firstName: String!
    lastName: String!
    fullName: String!
  }

  type Query {
    person: Person!
  }
`;

const resolvers = {
  Query: {
    person() {
      return {
        firstName: "Aaron",
        lastName: "Powell",
      };
    },
  },
  Person: {
    fullName(person) {
      return `${person.firstName} ${person.lastName}`;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(() => {
  console.log("Server is running");
});
