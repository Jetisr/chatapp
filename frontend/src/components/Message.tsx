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
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import React, { useState } from "react";
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
  isOwner: boolean;
}

const Message: React.FC<Props> = ({ message, isOwner }) => {
  const [deleteMessageFromServer] = useMutation<
    DeleteMessageMutation,
    DeleteMessageMutationVariables
  >(DELETE_MESSAGE, { variables: { messageId: message.id } });
  const [deleteMessageFromCache] = useMutation<
    DeletedMessageFromCacheMutation,
    DeletedMessageFromCacheMutationVariables
  >(DELETE_MESSAGE_FROM_CACHE, { variables: { id: message.id } });

  const [editMode, setEditMode] = useState(false);

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
        {isOwner && (
          <ListItemSecondaryAction>
            <IconButton
              color="primary"
              edge="end"
              aria-label="edit"
              onClick={() => setEditMode(current => !current)}
            >
              <EditOutlined />
            </IconButton>
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
