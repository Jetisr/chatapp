export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Message = {
   __typename?: 'Message',
  id: Scalars['ID'],
  messageText: Scalars['String'],
  user: User,
};

export type Mutation = {
   __typename?: 'Mutation',
  createUser: Result,
  login: Result,
  sendMessage: Result,
};


export type MutationCreateUserArgs = {
  userName: Scalars['String'],
  password: Scalars['String'],
  email: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>
};


export type MutationLoginArgs = {
  login: Scalars['String'],
  password: Scalars['String']
};


export type MutationSendMessageArgs = {
  messageText: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  user?: Maybe<User>,
  me?: Maybe<User>,
  allMessages: Array<Message>,
};


export type QueryUserArgs = {
  username?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};

export type Result = {
   __typename?: 'Result',
  success: Scalars['Boolean'],
  message?: Maybe<Scalars['String']>,
  data?: Maybe<ResultData>,
};

export type ResultData = User | Token | Message;

export type Token = {
   __typename?: 'Token',
  token?: Maybe<Scalars['String']>,
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  username: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  passwordHash: Scalars['String'],
  messages: Array<Message>,
};

export type LoginMutationVariables = {
  login: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'Result' }
    & Pick<Result, 'message' | 'success'>
    & { data: Maybe<{ __typename?: 'User' } | (
      { __typename?: 'Token' }
      & Pick<Token, 'token'>
    ) | { __typename?: 'Message' }> }
  ) }
);

export type CreateAccountMutationVariables = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>
};


export type CreateAccountMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'Result' }
    & Pick<Result, 'success' | 'message'>
    & { data: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'firstName' | 'id' | 'lastName' | 'username'>
      & { messages: Array<(
        { __typename?: 'Message' }
        & Pick<Message, 'id'>
        & { user: (
          { __typename?: 'User' }
          & Pick<User, 'id'>
        ) }
      )> }
    ) | { __typename?: 'Token' } | { __typename?: 'Message' }> }
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'firstName' | 'id' | 'lastName' | 'username'>
    & { messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ) }
    )> }
  )> }
);

export type AllMessagesQueryVariables = {};


export type AllMessagesQuery = (
  { __typename?: 'Query' }
  & { allMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'messageText'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);
