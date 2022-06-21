import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Game = Node & {
  __typename?: 'Game';
  answers: Array<PlayerAnswer>;
  id: Scalars['ID'];
  players: Array<Player>;
  questions: Array<Question>;
  state: GameState;
};

export enum GameState {
  Completed = 'Completed',
  Started = 'Started',
  WaitingForPlayers = 'WaitingForPlayers'
}

export type Mutation = {
  __typename?: 'Mutation';
  addPlayerToGame?: Maybe<Player>;
  createGame: Game;
  endGame?: Maybe<Game>;
  startGame?: Maybe<Game>;
  submitAnswer?: Maybe<Game>;
};


export type MutationAddPlayerToGameArgs = {
  gameId: Scalars['ID'];
  playerName: Scalars['String'];
};


export type MutationEndGameArgs = {
  gameId: Scalars['ID'];
};


export type MutationStartGameArgs = {
  gameId: Scalars['ID'];
};


export type MutationSubmitAnswerArgs = {
  answer: SubmittedAnswer;
};

export type Node = {
  id: Scalars['ID'];
};

export type Player = Node & {
  __typename?: 'Player';
  answers: Array<PlayerAnswer>;
  games: Array<Game>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type PlayerAnswer = Node & {
  __typename?: 'PlayerAnswer';
  answer: Scalars['String'];
  game: Game;
  id: Scalars['ID'];
  player: Player;
  question?: Maybe<Question>;
};

export type PlayerAnswerResult = {
  __typename?: 'PlayerAnswerResult';
  answer: Scalars['String'];
  answers: Array<Scalars['String']>;
  correct: Scalars['Boolean'];
  correctAnswer: Scalars['String'];
  question: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  game?: Maybe<Game>;
  games: Array<Game>;
  playerAnswers: Array<PlayerAnswerResult>;
};


export type QueryGameArgs = {
  id: Scalars['ID'];
};


export type QueryPlayerAnswersArgs = {
  gameId: Scalars['ID'];
  playerId: Scalars['ID'];
};

export type Question = Node & {
  __typename?: 'Question';
  answers: Array<Scalars['String']>;
  correctAnswer: Scalars['String'];
  games: Array<Game>;
  id: Scalars['ID'];
  question: Scalars['String'];
};

export type SubmittedAnswer = {
  answer: Scalars['String'];
  gameId: Scalars['ID'];
  playerId: Scalars['ID'];
  questionId: Scalars['ID'];
};

export type AddPlayerToGameMutationVariables = Exact<{
  gameId: Scalars['ID'];
  playerName: Scalars['String'];
}>;


export type AddPlayerToGameMutation = { __typename?: 'Mutation', addPlayerToGame?: { __typename?: 'Player', id: string } | null };

export type CreateGameMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'Game', id: string } };

export type EndGameMutationVariables = Exact<{
  gameId: Scalars['ID'];
}>;


export type EndGameMutation = { __typename?: 'Mutation', endGame?: { __typename?: 'Game', id: string } | null };

export type GetGameQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetGameQuery = { __typename?: 'Query', game?: { __typename?: 'Game', questions: Array<{ __typename?: 'Question', id: string, question: string, answers: Array<string> }> } | null };

export type PlayerResultsQueryVariables = Exact<{
  gameId: Scalars['ID'];
  playerId: Scalars['ID'];
}>;


export type PlayerResultsQuery = { __typename?: 'Query', playerAnswers: Array<{ __typename?: 'PlayerAnswerResult', correct: boolean, question: string, answers: Array<string>, correctAnswer: string, answer: string }> };

export type StartGameMutationVariables = Exact<{
  gameId: Scalars['ID'];
}>;


export type StartGameMutation = { __typename?: 'Mutation', startGame?: { __typename?: 'Game', id: string } | null };

export type SubmitAnswerMutationVariables = Exact<{
  answer: SubmittedAnswer;
}>;


export type SubmitAnswerMutation = { __typename?: 'Mutation', submitAnswer?: { __typename?: 'Game', id: string } | null };


export const AddPlayerToGame = gql`
    mutation AddPlayerToGame($gameId: ID!, $playerName: String!) {
  addPlayerToGame(gameId: $gameId, playerName: $playerName) {
    id
  }
}
    `;
export const CreateGame = gql`
    mutation CreateGame {
  createGame {
    id
  }
}
    `;
export const EndGame = gql`
    mutation EndGame($gameId: ID!) {
  endGame(gameId: $gameId) {
    id
  }
}
    `;
export const GetGame = gql`
    query GetGame($id: ID!) {
  game(id: $id) {
    questions {
      id
      question
      answers
    }
  }
}
    `;
export const PlayerResults = gql`
    query PlayerResults($gameId: ID!, $playerId: ID!) {
  playerAnswers(gameId: $gameId, playerId: $playerId) {
    correct
    question
    answers
    correctAnswer
    answer
  }
}
    `;
export const StartGame = gql`
    mutation StartGame($gameId: ID!) {
  startGame(gameId: $gameId) {
    id
  }
}
    `;
export const SubmitAnswer = gql`
    mutation SubmitAnswer($answer: SubmittedAnswer!) {
  submitAnswer(answer: $answer) {
    id
  }
}
    `;