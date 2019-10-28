import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  saveLogin: Scalars['String'],
  logout: Scalars['String'],
  deleteMessageFromCache: Scalars['String'],
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


export type MutationSaveLoginArgs = {
  token: Scalars['String']
};


export type MutationDeleteMessageFromCacheArgs = {
  id: Scalars['ID']
};

export type Query = {
   __typename?: 'Query',
  user?: Maybe<User>,
  me?: Maybe<User>,
  allMessages: Array<Message>,
  message?: Maybe<Message>,
  isLoggedIn: Scalars['Boolean'],
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
  messageDeleted: Scalars['ID'],
  messageEdited: Message,
};


export type SubscriptionMessageEditedArgs = {
  messageId?: Maybe<Scalars['ID']>
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
    & Pick<User, 'id' | 'username' | 'email' | 'firstName' | 'lastName'>
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

export type DeletedMessageFromCacheMutationVariables = {
  id: Scalars['ID']
};


export type DeletedMessageFromCacheMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMessageFromCache'>
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

export type IsLoggedInQueryVariables = {};


export type IsLoggedInQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isLoggedIn'>
);

export type NewMessagesSubscriptionVariables = {};


export type NewMessagesSubscription = (
  { __typename?: 'Subscription' }
  & { messageAdded: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'messageText'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'firstName' | 'lastName'>
    ) }
  ) }
);

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  User: ResolverTypeWrapper<User>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Message: ResolverTypeWrapper<Message>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Mutation: ResolverTypeWrapper<{}>,
  Result: ResolverTypeWrapper<Result>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  Subscription: ResolverTypeWrapper<{}>,
  AddAvatarResult: ResolverTypeWrapper<AddAvatarResult>,
  CacheControlScope: CacheControlScope,
  CreateUserResult: ResolverTypeWrapper<CreateUserResult>,
  DeleteMessageResult: ResolverTypeWrapper<DeleteMessageResult>,
  EditMessageResult: ResolverTypeWrapper<EditMessageResult>,
  LoginResult: ResolverTypeWrapper<LoginResult>,
  SendMessageResult: ResolverTypeWrapper<SendMessageResult>,
  Token: ResolverTypeWrapper<Token>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  String: Scalars['String'],
  User: User,
  ID: Scalars['ID'],
  Message: Message,
  Boolean: Scalars['Boolean'],
  Mutation: {},
  Result: Result,
  Upload: Scalars['Upload'],
  Subscription: {},
  AddAvatarResult: AddAvatarResult,
  CacheControlScope: CacheControlScope,
  CreateUserResult: CreateUserResult,
  DeleteMessageResult: DeleteMessageResult,
  EditMessageResult: EditMessageResult,
  LoginResult: LoginResult,
  SendMessageResult: SendMessageResult,
  Token: Token,
  Int: Scalars['Int'],
}>;

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = {   maxAge?: Maybe<Maybe<Scalars['Int']>>,
  scope?: Maybe<Maybe<CacheControlScope>> }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AddAvatarResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddAvatarResult'] = ResolversParentTypes['AddAvatarResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  imageLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type CreateUserResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserResult'] = ResolversParentTypes['CreateUserResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export type DeleteMessageResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteMessageResult'] = ResolversParentTypes['DeleteMessageResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type EditMessageResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditMessageResult'] = ResolversParentTypes['EditMessageResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  editedMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>,
}>;

export type LoginResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  messageText?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userName' | 'password' | 'email'>>,
  login?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'login' | 'password'>>,
  sendMessage?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'messageText'>>,
  deleteMessage?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationDeleteMessageArgs, 'messageId'>>,
  editMessage?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationEditMessageArgs, 'messageId' | 'updatedText'>>,
  addAvatar?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationAddAvatarArgs, 'avatar'>>,
  saveLogin?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSaveLoginArgs, 'token'>>,
  logout?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  deleteMessageFromCache?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteMessageFromCacheArgs, 'id'>>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, QueryUserArgs>,
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  allMessages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, QueryAllMessagesArgs>,
  message?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryMessageArgs, 'messageId'>>,
  isLoggedIn?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type ResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']> = ResolversObject<{
  __resolveType: TypeResolveFn<'AddAvatarResult' | 'CreateUserResult' | 'DeleteMessageResult' | 'EditMessageResult' | 'LoginResult' | 'SendMessageResult', ParentType, ContextType>,
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type SendMessageResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendMessageResult'] = ResolversParentTypes['SendMessageResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  sentMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>,
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  messageAdded?: SubscriptionResolver<ResolversTypes['Message'], "messageAdded", ParentType, ContextType>,
  messageDeleted?: SubscriptionResolver<ResolversTypes['ID'], "messageDeleted", ParentType, ContextType>,
  messageEdited?: SubscriptionResolver<ResolversTypes['Message'], "messageEdited", ParentType, ContextType, SubscriptionMessageEditedArgs>,
}>;

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  passwordHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AddAvatarResult?: AddAvatarResultResolvers<ContextType>,
  CreateUserResult?: CreateUserResultResolvers<ContextType>,
  DeleteMessageResult?: DeleteMessageResultResolvers<ContextType>,
  EditMessageResult?: EditMessageResultResolvers<ContextType>,
  LoginResult?: LoginResultResolvers<ContextType>,
  Message?: MessageResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Result?: ResultResolvers,
  SendMessageResult?: SendMessageResultResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  Token?: TokenResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>,
}>;


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;