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


export type AddAvatarResult = Result & {
   __typename?: 'AddAvatarResult',
  success: Scalars['Boolean'],
  message?: Maybe<Scalars['String']>,
  imageLocation?: Maybe<Scalars['String']>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CreateUserResult = Result & {
   __typename?: 'CreateUserResult',
  success: Scalars['Boolean'],
  message?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};

export type DeleteMessageResult = Result & {
   __typename?: 'DeleteMessageResult',
  success: Scalars['Boolean'],
  message?: Maybe<Scalars['String']>,
};

export type EditMessageResult = Result & {
   __typename?: 'EditMessageResult',
  success: Scalars['Boolean'],
  message?: Maybe<Scalars['String']>,
  editedMessage?: Maybe<Message>,
};

export type LoginResult = Result & {
   __typename?: 'LoginResult',
  success: Scalars['Boolean'],
  message?: Maybe<Scalars['String']>,
  token?: Maybe<Scalars['String']>,
};

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
  deleteMessage: Result,
  editMessage: Result,
  addAvatar: Result,
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


export type MutationDeleteMessageArgs = {
  messageId: Scalars['ID']
};


export type MutationEditMessageArgs = {
  messageId: Scalars['ID'],
  updatedText: Scalars['String']
};


export type MutationAddAvatarArgs = {
  avatar: Scalars['Upload']
};

export type Query = {
   __typename?: 'Query',
  user?: Maybe<User>,
  me?: Maybe<User>,
  allMessages: Array<Message>,
  message?: Maybe<Message>,
};


export type QueryUserArgs = {
  username?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryAllMessagesArgs = {
  email?: Maybe<Scalars['String']>,
  username?: Maybe<Scalars['String']>
};


export type QueryMessageArgs = {
  messageId: Scalars['ID']
};

export type Result = {
  success: Scalars['Boolean'],
  message?: Maybe<Scalars['String']>,
};

export type SendMessageResult = Result & {
   __typename?: 'SendMessageResult',
  success: Scalars['Boolean'],
  message?: Maybe<Scalars['String']>,
  sentMessage?: Maybe<Message>,
};

export type Subscription = {
   __typename?: 'Subscription',
  messageAdded: Message,
};

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

export type MessageListMessageFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'messageText'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type LoginMutationVariables = {
  login: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AddAvatarResult' }
    & Pick<AddAvatarResult, 'message' | 'success'>
  ) | (
    { __typename?: 'CreateUserResult' }
    & Pick<CreateUserResult, 'message' | 'success'>
  ) | (
    { __typename?: 'DeleteMessageResult' }
    & Pick<DeleteMessageResult, 'message' | 'success'>
  ) | (
    { __typename?: 'EditMessageResult' }
    & Pick<EditMessageResult, 'message' | 'success'>
  ) | (
    { __typename?: 'LoginResult' }
    & Pick<LoginResult, 'token' | 'message' | 'success'>
  ) | (
    { __typename?: 'SendMessageResult' }
    & Pick<SendMessageResult, 'message' | 'success'>
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
    { __typename?: 'AddAvatarResult' }
    & Pick<AddAvatarResult, 'success' | 'message'>
  ) | (
    { __typename?: 'CreateUserResult' }
    & Pick<CreateUserResult, 'success' | 'message'>
    & { user: Maybe<(
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
  ) | (
    { __typename?: 'DeleteMessageResult' }
    & Pick<DeleteMessageResult, 'success' | 'message'>
  ) | (
    { __typename?: 'EditMessageResult' }
    & Pick<EditMessageResult, 'success' | 'message'>
  ) | (
    { __typename?: 'LoginResult' }
    & Pick<LoginResult, 'success' | 'message'>
  ) | (
    { __typename?: 'SendMessageResult' }
    & Pick<SendMessageResult, 'success' | 'message'>
  ) }
);

export type SendMessageMutationVariables = {
  messageText: Scalars['String']
};


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage: (
    { __typename?: 'AddAvatarResult' }
    & Pick<AddAvatarResult, 'success' | 'message'>
  ) | (
    { __typename?: 'CreateUserResult' }
    & Pick<CreateUserResult, 'success' | 'message'>
  ) | (
    { __typename?: 'DeleteMessageResult' }
    & Pick<DeleteMessageResult, 'success' | 'message'>
  ) | (
    { __typename?: 'EditMessageResult' }
    & Pick<EditMessageResult, 'success' | 'message'>
  ) | (
    { __typename?: 'LoginResult' }
    & Pick<LoginResult, 'success' | 'message'>
  ) | (
    { __typename?: 'SendMessageResult' }
    & Pick<SendMessageResult, 'success' | 'message'>
  ) }
);

export type DeleteMessageMutationVariables = {
  messageId: Scalars['ID']
};


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & { deleteMessage: (
    { __typename?: 'AddAvatarResult' }
    & Pick<AddAvatarResult, 'success' | 'message'>
  ) | (
    { __typename?: 'CreateUserResult' }
    & Pick<CreateUserResult, 'success' | 'message'>
  ) | (
    { __typename?: 'DeleteMessageResult' }
    & Pick<DeleteMessageResult, 'success' | 'message'>
  ) | (
    { __typename?: 'EditMessageResult' }
    & Pick<EditMessageResult, 'success' | 'message'>
  ) | (
    { __typename?: 'LoginResult' }
    & Pick<LoginResult, 'success' | 'message'>
  ) | (
    { __typename?: 'SendMessageResult' }
    & Pick<SendMessageResult, 'success' | 'message'>
  ) }
);

export type EditMessageMutationVariables = {
  messageId: Scalars['ID'],
  updatedText: Scalars['String']
};


export type EditMessageMutation = (
  { __typename?: 'Mutation' }
  & { editMessage: (
    { __typename?: 'AddAvatarResult' }
    & Pick<AddAvatarResult, 'message' | 'success'>
  ) | (
    { __typename?: 'CreateUserResult' }
    & Pick<CreateUserResult, 'message' | 'success'>
  ) | (
    { __typename?: 'DeleteMessageResult' }
    & Pick<DeleteMessageResult, 'message' | 'success'>
  ) | (
    { __typename?: 'EditMessageResult' }
    & Pick<EditMessageResult, 'message' | 'success'>
    & { editedMessage: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'messageText'>
    )> }
  ) | (
    { __typename?: 'LoginResult' }
    & Pick<LoginResult, 'message' | 'success'>
  ) | (
    { __typename?: 'SendMessageResult' }
    & Pick<SendMessageResult, 'message' | 'success'>
  ) }
);

export type AddAvatarMutationVariables = {
  avatar: Scalars['Upload']
};


export type AddAvatarMutation = (
  { __typename?: 'Mutation' }
  & { addAvatar: (
    { __typename?: 'AddAvatarResult' }
    & Pick<AddAvatarResult, 'success'>
  ) | (
    { __typename?: 'CreateUserResult' }
    & Pick<CreateUserResult, 'success'>
  ) | (
    { __typename?: 'DeleteMessageResult' }
    & Pick<DeleteMessageResult, 'success'>
  ) | (
    { __typename?: 'EditMessageResult' }
    & Pick<EditMessageResult, 'success'>
  ) | (
    { __typename?: 'LoginResult' }
    & Pick<LoginResult, 'success'>
  ) | (
    { __typename?: 'SendMessageResult' }
    & Pick<SendMessageResult, 'success'>
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
    & MessageListMessageFragment
  )> }
);

export type MessageQueryVariables = {
  messageId: Scalars['ID']
};


export type MessageQuery = (
  { __typename?: 'Query' }
  & { message: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'messageText'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'firstName' | 'lastName' | 'username' | 'email' | 'id'>
    ) }
  )> }
);

export type NewMessagesSubscriptionVariables = {};


export type NewMessagesSubscription = (
  { __typename?: 'Subscription' }
  & { messageAdded: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'messageText'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);
