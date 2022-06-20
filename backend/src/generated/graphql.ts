import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Game = Node & {
  __typename?: "Game";
  answers: Array<PlayerAnswer>;
  id: Scalars["ID"];
  players: Array<Player>;
  questions: Array<Question>;
  state: GameState;
};

export enum GameState {
  Completed = "Completed",
  Started = "Started",
  WaitingForPlayers = "WaitingForPlayers",
}

export type Node = {
  id: Scalars["ID"];
};

export type Player = Node & {
  __typename?: "Player";
  answers: Array<PlayerAnswer>;
  games: Array<Game>;
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type PlayerAnswer = Node & {
  __typename?: "PlayerAnswer";
  answer: Scalars["String"];
  game: Game;
  id: Scalars["ID"];
  player: Player;
  question?: Maybe<Question>;
};

export type Query = {
  __typename?: "Query";
  game?: Maybe<Game>;
  games: Array<Game>;
};

export type QueryGameArgs = {
  id: Scalars["ID"];
};

export type Question = Node & {
  __typename?: "Question";
  answers: Array<Scalars["String"]>;
  correctAnswer: Scalars["String"];
  games: Array<Game>;
  id: Scalars["ID"];
  question: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Game: ResolverTypeWrapper<Game>;
  GameState: GameState;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Node:
    | ResolversTypes["Game"]
    | ResolversTypes["Player"]
    | ResolversTypes["PlayerAnswer"]
    | ResolversTypes["Question"];
  Player: ResolverTypeWrapper<Player>;
  PlayerAnswer: ResolverTypeWrapper<PlayerAnswer>;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  String: ResolverTypeWrapper<Scalars["String"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  Game: Game;
  ID: Scalars["ID"];
  Node:
    | ResolversParentTypes["Game"]
    | ResolversParentTypes["Player"]
    | ResolversParentTypes["PlayerAnswer"]
    | ResolversParentTypes["Question"];
  Player: Player;
  PlayerAnswer: PlayerAnswer;
  Query: {};
  Question: Question;
  String: Scalars["String"];
};

export type GameResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Game"] = ResolversParentTypes["Game"]
> = {
  answers?: Resolver<
    Array<ResolversTypes["PlayerAnswer"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  players?: Resolver<Array<ResolversTypes["Player"]>, ParentType, ContextType>;
  questions?: Resolver<
    Array<ResolversTypes["Question"]>,
    ParentType,
    ContextType
  >;
  state?: Resolver<ResolversTypes["GameState"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = {
  __resolveType: TypeResolveFn<
    "Game" | "Player" | "PlayerAnswer" | "Question",
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
};

export type PlayerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Player"] = ResolversParentTypes["Player"]
> = {
  answers?: Resolver<
    Array<ResolversTypes["PlayerAnswer"]>,
    ParentType,
    ContextType
  >;
  games?: Resolver<Array<ResolversTypes["Game"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerAnswerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PlayerAnswer"] = ResolversParentTypes["PlayerAnswer"]
> = {
  answer?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  game?: Resolver<ResolversTypes["Game"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  player?: Resolver<ResolversTypes["Player"], ParentType, ContextType>;
  question?: Resolver<
    Maybe<ResolversTypes["Question"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  game?: Resolver<
    Maybe<ResolversTypes["Game"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGameArgs, "id">
  >;
  games?: Resolver<Array<ResolversTypes["Game"]>, ParentType, ContextType>;
};

export type QuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Question"] = ResolversParentTypes["Question"]
> = {
  answers?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  correctAnswer?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  games?: Resolver<Array<ResolversTypes["Game"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  question?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Game?: GameResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  PlayerAnswer?: PlayerAnswerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
};
