import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AddPlayerToGame,
  AddPlayerToGameMutation,
  StartGameMutation,
  StartGame,
} from "../generated/graphql";
import { GameRoute } from "../types";

export const JoinGame = () => {
  const { id } = useParams<GameRoute>();
  const [name, setName] = useState("");

  const [addPlayer, { loading: addPlayerLoading, data }] =
    useMutation<AddPlayerToGameMutation>(AddPlayerToGame, {
      variables: { gameId: id, playerName: name },
    });

  const [startGame, { loading: startGameLoading, called: startGameCalled }] =
    useMutation<StartGameMutation>(StartGame, { variables: { gameId: id } });

  useEffect(() => {
    if (!addPlayerLoading && data) {
      startGame();
    }
  }, [addPlayerLoading, data]);

  const navigate = useNavigate();

  useEffect(() => {
    if (startGameCalled && !startGameLoading) {
      navigate(`/game/${id}/play/${data?.addPlayerToGame?.id}`);
    }
  }, [navigate, data, startGameCalled, startGameLoading]);

  return (
    <div>
      <h1>Join Game: {id}</h1>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button disabled={!name || addPlayerLoading} onClick={() => addPlayer()}>
        Let's go
      </button>
    </div>
  );
};
