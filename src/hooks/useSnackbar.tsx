import React, { useState } from "react";

const useSnackbar = () => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event: React.SyntheticEvent<any>, reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setMessage("");
  };

  const openSnackbar = (textToDisplay: string) => {
    setOpen(true);
    setMessage(textToDisplay);
  };

  const snackbarProps = {
    open,
    message: <span id="message">{message}</span>,
    onClose: handleClose,
    ContentProps: { "aria-describedby": "message" }
  };

  return { openSnackbar, snackbarProps };
};

export default useSnackbar;
