import { useQuery, useSubscription, useMutation } from "@apollo/react-hooks";
import {
  createStyles,
  LinearProgress,
  List,
  makeStyles,
  Paper,
  Theme
} from "@material-ui/core";
import React, { useLayoutEffect, useRef } from "react";
import { Message } from "../components";
import { ALL_MESSAGES, ME } from "../graphql/queries";
import {
  SUBSCRIBE_TO_NEW_MESSAGES,
  SUBSCRIBE_TO_DELETIONS,
  SUBSCRIBE_TO_EDITS
} from "../graphql/subscriptions";
import {
  AllMessagesQuery,
  NewMessagesSubscription,
  MeQuery,
  DeletedMessageFromCacheMutation,
  DeletedMessageFromCacheMutationVariables,
  DeleteMessagesSubscription,
  EditsToMessageSubscription,
  EditMessageInCacheMutation,
  EditMessageInCacheMutationVariables
} from "../typescript/codegen";
import {
  DELETE_MESSAGE_FROM_CACHE,
  EDIT_MESSAGE_IN_CACHE
} from "../graphql/mutations";
import SendMessageField from "../components/SendMessageField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxHeight: "calc(100vh - 56px)",
      overflowY: "auto",
      position: "relative"
    },
    newMessageField: {
      width: "100%"
    }
  })
);

const ChatRoom: React.FC = () => {
  const { loading, data } = useQuery<AllMessagesQuery>(ALL_MESSAGES);
  const { data: currentUser } = useQuery<MeQuery>(ME);
  const classes = useStyles();
  const messageEnd = useRef<HTMLDivElement>(null);
  const [deleteMessageFromCache] = useMutation<
    DeletedMessageFromCacheMutation,
    DeletedMessageFromCacheMutationVariables
  >(DELETE_MESSAGE_FROM_CACHE);
  const [editMessageInCache] = useMutation<
    EditMessageInCacheMutation,
    EditMessageInCacheMutationVariables
  >(EDIT_MESSAGE_IN_CACHE);

  useSubscription<NewMessagesSubscription>(SUBSCRIBE_TO_NEW_MESSAGES, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const allMessages = client.readQuery<AllMessagesQuery>({
        query: ALL_MESSAGES
      });
      client.writeQuery({
        query: ALL_MESSAGES,
        data: {
          allMessages: [
            ...allMessages!.allMessages,
            subscriptionData.data!.messageAdded
          ]
        }
      });
    }
  });

  useSubscription<DeleteMessagesSubscription>(SUBSCRIBE_TO_DELETIONS, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data) {
        deleteMessageFromCache({
          variables: { id: subscriptionData.data.messageDeleted }
        });
      }
    }
  });

  useSubscription<EditsToMessageSubscription>(SUBSCRIBE_TO_EDITS, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data) {
        editMessageInCache({
          variables: {
            id: subscriptionData.data.messageEdited.id,
            text: subscriptionData.data.messageEdited.messageText
          }
        });
      }
    }
  });

  useLayoutEffect(() => {
    if (messageEnd.current) messageEnd.current.scrollIntoView();
  }, [data]);

  if (loading) return <LinearProgress />;

  return (
    <>
      <Paper className={classes.root}>
        <List>
          {data &&
            data.allMessages.map(m => (
              <Message
                key={m.id}
                message={m}
                isOwner={
                  (currentUser &&
                    currentUser.me &&
                    currentUser.me.username === m.user.username) ||
                  false
                }
              />
            ))}
          <div ref={messageEnd} />
        </List>
      </Paper>
      <Paper>
        <SendMessageField />
      </Paper>
    </>
  );
};

export default ChatRoom;
