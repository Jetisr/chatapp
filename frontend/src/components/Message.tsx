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
import React from "react";
import {
  DELETE_MESSAGE,
  DELETE_MESSAGE_FROM_CACHE,
  EDIT_MESSAGE
} from "../graphql/mutations";
import {
  DeleteMessageMutation,
  DeleteMessageMutationVariables,
  MessageListMessageFragment,
  DeletedMessageFromCacheMutation,
  DeletedMessageFromCacheMutationVariables,
  EditMessageMutation,
  EditMessageMutationVariables
} from "../typescript/codegen";
import { useModal } from "../contexts/ModalContext";

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
  const [editMessageMutation] = useMutation<
    EditMessageMutation,
    EditMessageMutationVariables
  >(EDIT_MESSAGE);

  const { confirm, form } = useModal();

  const deleteMessage = async () => {
    if (
      await confirm({
        title: "Delete Message?",
        description:
          "Deleting a message is permanent. Are you sure you want to do this?"
      })
    ) {
      const deleteMessageResult = await deleteMessageFromServer();
      if (
        deleteMessageResult.data &&
        deleteMessageResult.data.deleteMessage.success
      ) {
        deleteMessageFromCache();
      }
    }
  };

  const editMessage = () => {
    form({
      title: "Edit Message",
      initialValue: message.messageText,
      onConfirm: formValue => {
        editMessageMutation({
          variables: {
            messageId: message.id,
            updatedText: formValue
          }
        });
      }
    });
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
          <>
            <ListItemSecondaryAction>
              <IconButton
                color="primary"
                edge="end"
                aria-label="edit"
                onClick={editMessage}
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
          </>
        )}
      </ListItem>
      <Divider />
    </>
  );
};

export default Message;
