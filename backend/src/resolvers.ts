export const resolvers = {
  Query: {
    game(_, { id }) {
      return {
        id,
        players: [],
        state: "WaitingForPlayers",
        question: [],
        answers: [],
      };
    },

    games() {
      return []
    }
  },
};
