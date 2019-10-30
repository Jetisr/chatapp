import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import { useModal } from "../contexts/ModalContext";

const Modal: React.FunctionComponent = () => {
  const { modalState } = useModal();
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    if (modalState.type === "FORM") {
      setFormValue(modalState.initialValue);
    }
  }, [modalState]);

  return (
    <Dialog open={modalState.open} onClose={modalState.onCancel}>
      <DialogTitle>{modalState.title}</DialogTitle>
      <DialogContent>
        {modalState.type === "CONFIRM" ? (
          <DialogContentText>{modalState.description}</DialogContentText>
        ) : (
          <TextField
            autoFocus
            fullWidth
            value={formValue}
            onChange={({ target }) => setFormValue(target.value)}
            onKeyPress={({ key }) => {
              if (key === "Enter") {
                modalState.onConfirm(formValue);
              }
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={modalState.onCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => modalState.onConfirm(formValue)}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
