import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

interface ConfirmOptions {
  title: string;
  message: string;
}

const useConfirmDialog = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const awaitingUserActionRef = useRef<{
    resolve: () => void;
    reject: () => void;
  }>();

  const handleCancel = () => {
    if (awaitingUserActionRef.current) {
      awaitingUserActionRef.current.reject();
    }
  };

  const handleConfirm = () => {
    if (awaitingUserActionRef.current) {
      awaitingUserActionRef.current.resolve();
    }
  };

  const ConfirmDialog = () => (
    <Dialog open={confirmOpen} onClose={handleCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  const confirm = async (options: ConfirmOptions) => {
    setTitle(options.title);
    setMessage(options.message);
    setConfirmOpen(true);
    try {
      await new Promise((resolve, reject) => {
        awaitingUserActionRef.current = { resolve, reject };
      });
      setConfirmOpen(false);
      setTitle("");
      setMessage("");
      return true;
    } catch {
      setConfirmOpen(false);
      setTitle("");
      setMessage("");
      return false;
    }
  };

  return { ConfirmDialog, confirm };
};

export default useConfirmDialog;
