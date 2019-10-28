import { useMutation } from "@apollo/react-hooks";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import React from "react";
import {
  DELETE_MESSAGE,
  DELETE_MESSAGE_FROM_CACHE
} from "../graphql/mutations";
import {
  DeleteMessageMutation,
  DeleteMessageMutationVariables,
  MessageListMessageFragment,
  DeletedMessageFromCacheMutation,
  DeletedMessageFromCacheMutationVariables
} from "../typescript/codegen";

interface Props {
  message: MessageListMessageFragment;
  canDelete: boolean;
}

const Message: React.FC<Props> = ({ message, canDelete }) => {
  const [deleteMessageFromServer] = useMutation<
    DeleteMessageMutation,
    DeleteMessageMutationVariables
  >(DELETE_MESSAGE, { variables: { messageId: message.id } });
  const [deleteMessageFromCache] = useMutation<
    DeletedMessageFromCacheMutation,
    DeletedMessageFromCacheMutationVariables
  >(DELETE_MESSAGE_FROM_CACHE, { variables: { id: message.id } });

  const deleteMessage = async () => {
    const deleteMessageResult = await deleteMessageFromServer();
    if (
      deleteMessageResult.data &&
      deleteMessageResult.data.deleteMessage.success
    ) {
      deleteMessageFromCache();
    }
  };

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar>{message.user.username[0].toUpperCase()}</Avatar>
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
              onClick={deleteMessage}
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
