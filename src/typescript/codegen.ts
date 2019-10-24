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
  Upload: Promise<{ filename: string; mimetype: string; encoding: string; createReadStream: () => NodeJS.ReadableStream }>,
};

export type AddAvatarResult = Result & {
   __typename?: 'AddAvatarResult',
  success: Scalars['Boolean'],
  message?: Maybe<Scalars['String']>,
  cloudinaryUrl?: Maybe<Scalars['String']>,
};

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
  Mutation: ResolverTypeWrapper<{}>,
  Result: ResolverTypeWrapper<Result>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  Subscription: ResolverTypeWrapper<{}>,
  CreateUserResult: ResolverTypeWrapper<CreateUserResult>,
  LoginResult: ResolverTypeWrapper<LoginResult>,
  SendMessageResult: ResolverTypeWrapper<SendMessageResult>,
  DeleteMessageResult: ResolverTypeWrapper<DeleteMessageResult>,
  EditMessageResult: ResolverTypeWrapper<EditMessageResult>,
  AddAvatarResult: ResolverTypeWrapper<AddAvatarResult>,
  Token: ResolverTypeWrapper<Token>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  String: Scalars['String'],
  User: User,
  ID: Scalars['ID'],
  Message: Message,
  Mutation: {},
  Result: Result,
  Boolean: Scalars['Boolean'],
  Upload: Scalars['Upload'],
  Subscription: {},
  CreateUserResult: CreateUserResult,
  LoginResult: LoginResult,
  SendMessageResult: SendMessageResult,
  DeleteMessageResult: DeleteMessageResult,
  EditMessageResult: EditMessageResult,
  AddAvatarResult: AddAvatarResult,
  Token: Token,
}>;

export type AddAvatarResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddAvatarResult'] = ResolversParentTypes['AddAvatarResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  cloudinaryUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
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
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, QueryUserArgs>,
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  allMessages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, QueryAllMessagesArgs>,
  message?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryMessageArgs, 'messageId'>>,
}>;

export type ResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CreateUserResult' | 'LoginResult' | 'SendMessageResult' | 'DeleteMessageResult' | 'EditMessageResult' | 'AddAvatarResult', ParentType, ContextType>,
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
