import { useMutation } from "@apollo/react-hooks";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Typography,
  Avatar
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import React from "react";
import { DELETE_MESSAGE } from "../graphql/mutations";
import { ALL_MESSAGES } from "../graphql/queries";
import {
  AllMessagesQuery,
  DeleteMessageMutation,
  DeleteMessageMutationVariables,
  MessageListMessageFragment
} from "../typescript/codegen";

interface Props {
  message: MessageListMessageFragment;
  canDelete: boolean;
}

const Message: React.FC<Props> = ({ message, canDelete }) => {
  const [deleteMessage] = useMutation<
    DeleteMessageMutation,
    DeleteMessageMutationVariables
  >(DELETE_MESSAGE, {
    variables: { messageId: message.id },
    update: (cache, { data }) => {
      if (data && data.deleteMessage.success) {
        const currentMessages = cache.readQuery<AllMessagesQuery>({
          query: ALL_MESSAGES
        });
        if (currentMessages) {
          const filteredMessages = currentMessages.allMessages.filter(
            m => m.id !== message.id
          );
          cache.writeQuery({
            query: ALL_MESSAGES,
            data: { allMessages: filteredMessages }
          });
        }
      }
    }
  });

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Typography variant="h5">
              {message.user.username[0].toUpperCase()}
            </Typography>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={message.user.username}
          secondary={message.messageText}
        />
        {canDelete && (
          <ListItemSecondaryAction>
            <IconButton
              color="primary"
              edge="end"
              aria-label="delete"
              onClick={() => {
                deleteMessage();
              }}
            >
              <DeleteOutline />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <Divider />
    </>
  );
};

export default Message;
