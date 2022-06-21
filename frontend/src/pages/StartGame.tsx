import React from "react";
import { useQuery } from "@apollo/client";
import { GetGames, GetGamesQuery } from "../generated/graphql";

export const StartGame = () => {
  const { loading, data } = useQuery<GetGamesQuery>(GetGames);

  if (loading || !data) {
    return <h1>Loading game data...</h1>;
  }

  return (
    <div>
      <h1>Games in our system</h1>
      <ul>
        {data.games.map((game) => (
          <li key={game.id}>
            {game.id} {game.state} {JSON.stringify(game.players)}
          </li>
        ))}
      </ul>
    </div>
  );
};
