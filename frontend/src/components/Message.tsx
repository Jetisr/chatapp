import { useMutation } from "@apollo/react-hooks";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText
} from "@material-ui/core";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import React, { useState } from "react";
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

  const [editMode, setEditMode] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [messageTextForEditing, setMessageTextForEditing] = useState(
    message.messageText
  );

  const deleteMessage = async () => {
    const deleteMessageResult = await deleteMessageFromServer();
    if (
      deleteMessageResult.data &&
      deleteMessageResult.data.deleteMessage.success
    ) {
      deleteMessageFromCache();
    }
  };

  const toggleEdit = () => {
    setEditMode(current => !current);
  };

  const editMessage = () => {
    toggleEdit();
    editMessageMutation({
      variables: {
        messageId: message.id,
        updatedText: messageTextForEditing
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
                onClick={toggleEdit}
              >
                <EditOutlined />
              </IconButton>
              <IconButton
                color="primary"
                edge="end"
                aria-label="delete"
                onClick={() => setDeleteConfirmOpen(true)}
              >
                <DeleteOutline />
              </IconButton>
            </ListItemSecondaryAction>
            <Dialog open={editMode} onClose={toggleEdit}>
              <DialogTitle>Edit Message</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  fullWidth
                  value={messageTextForEditing}
                  onChange={({ target }) =>
                    setMessageTextForEditing(target.value)
                  }
                  onKeyPress={({ key }) => {
                    // OnKeyDown and OnKeyUp doesn't toggle the dialog properly
                    if (key === "Enter") {
                      editMessage();
                    }
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={toggleEdit} color="primary">
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    editMessage();
                  }}
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={deleteConfirmOpen}
              onClose={() => setDeleteConfirmOpen(false)}
            >
              <DialogTitle>Delete message?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Deleting a message is permanent. Are you sure you want to do
                  this?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setDeleteConfirmOpen(false)}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    deleteMessage();
                    setDeleteConfirmOpen(false);
                  }}
                  color="primary"
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </ListItem>
      <Divider />
    </>
  );
};

export default Message;
