import { useMutation } from "@apollo/react-hooks";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon
} from "@material-ui/core";
import {
  DeleteOutline,
  EditOutlined,
  MoreVertOutlined
} from "@material-ui/icons";
import React, { useRef, useState } from "react";
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
  const moreIconRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  const { confirm, form } = useModal();

  const deleteMessage = async () => {
    setOpen(false);
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
    setOpen(false);
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

  const handleMenuClose = () => {
    setOpen(false);
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
                aria-label="options"
                ref={moreIconRef}
                onClick={() => {
                  setOpen(true);
                }}
              >
                <MoreVertOutlined />
              </IconButton>
              <Menu
                anchorEl={moreIconRef.current}
                keepMounted
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={editMessage}>
                  <ListItemIcon>
                    <EditOutlined color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Edit" />
                </MenuItem>
                <MenuItem onClick={deleteMessage}>
                  <ListItemIcon>
                    <DeleteOutline fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Delete" />
                </MenuItem>
              </Menu>
            </ListItemSecondaryAction>
          </>
        )}
      </ListItem>
      <Divider />
    </>
  );
};

export default Message;
