import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CreateGame, CreateGameMutation } from "../generated/graphql";
import { useNavigate } from "react-router-dom";

export const StartGame = () => {
  const [createGame, { loading, data }] =
    useMutation<CreateGameMutation>(CreateGame);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate(`/game/${data.createGame.id}/join`);
    }
  }, [data]);

  return (
    <div>
      <h1>Would you like to play a game?</h1>
      <button onClick={() => createGame()} disabled={loading}>
        Yes I would
      </button>
    </div>
  );
};
