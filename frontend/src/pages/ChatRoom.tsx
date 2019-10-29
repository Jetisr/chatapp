import { useQuery, useSubscription, useMutation } from "@apollo/react-hooks";
import {
  createStyles,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  makeStyles,
  Paper,
  TextField,
  Theme
} from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Message } from "../components";
import { ALL_MESSAGES, ME } from "../graphql/queries";
import { SUBSCRIBE_TO_NEW_MESSAGES } from "../graphql/subscriptions";
import {
  AllMessagesQuery,
  NewMessagesSubscription,
  SendMessageMutation,
  SendMessageMutationVariables,
  MeQuery
} from "../typescript/codegen";
import { SEND_MESSAGE } from "../graphql/mutations";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxHeight: "100vh",
      overflowY: "auto",
      position: "relative"
    },
    newMessageField: {
      width: "100%"
    },
    newMessageContainer: {
      position: "sticky",
      bottom: 0
    }
  })
);

const ChatRoom: React.FC = () => {
  const { loading, data } = useQuery<AllMessagesQuery>(ALL_MESSAGES);
  const { data: currentUser } = useQuery<MeQuery>(ME);
  const classes = useStyles();
  const messageEnd = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [sendMessage, { loading: sendingMessage }] = useMutation<
    SendMessageMutation,
    SendMessageMutationVariables
  >(SEND_MESSAGE, { variables: { messageText: message } });

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

  useLayoutEffect(() => {
    if (messageEnd.current) messageEnd.current.scrollIntoView();
  }, [data]);

  if (loading) return <LinearProgress />;

  return (
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
      <Paper className={classes.newMessageContainer}>
        <TextField
          label="Send a message"
          variant="filled"
          value={message}
          onChange={({ target }) => {
            setMessage(target.value);
          }}
          onKeyDown={({ key }) => {
            if (key === "Enter") {
              sendMessage();
              setMessage("");
            }
          }}
          className={classes.newMessageField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  disabled={sendingMessage}
                  onClick={() => {
                    sendMessage();
                    setMessage("");
                  }}
                >
                  <SendOutlined />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Paper>
    </Paper>
  );
};

export default ChatRoom;
