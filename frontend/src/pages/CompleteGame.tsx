import { useQuery } from "@apollo/client";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { PlayerResults, PlayerResultsQuery } from "../generated/graphql";
import { PlayerRoute } from "../types";

const CompleteGame = () => {
  const { id, player } = useParams<PlayerRoute>();

  if (!id) {
    return <Navigate to="/" replace={true} />;
  }

  const { loading, data } = useQuery<PlayerResultsQuery>(PlayerResults, {
    variables: {
      gameId: id,
      playerId: player,
    },
  });

  if (loading || !data) {
    return <h1>Waiting for your answers</h1>;
  }

  return (
    <div>
      <h1>Game over man, game over!</h1>
      {data.playerAnswers.map((result) => {
        return (
          <div key={result.question}>
            <h2>
              {result.correct ? "✅" : "❌"}
              <span
                dangerouslySetInnerHTML={{ __html: result.question }}
              ></span>{" "}
            </h2>
            <ul>
              {result.answers.map((a) => {
                return (
                  <li
                    key={a}
                    className={`${a === result.answer ? "submitted" : ""} ${
                      a === result.correctAnswer ? "correct" : ""
                    }`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: a }}></span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default CompleteGame;
