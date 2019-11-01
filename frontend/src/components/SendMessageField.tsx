import { useMutation } from "@apollo/react-hooks";
import {
  createStyles,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField
} from "@material-ui/core";
import React, { useState } from "react";
import { SEND_MESSAGE } from "../graphql/mutations";
import {
  SendMessageMutation,
  SendMessageMutationVariables
} from "../typescript/codegen";
import { SendOutlined } from "@material-ui/icons";

const useStyles = makeStyles(() =>
  createStyles({
    messageField: {
      width: "100%"
    }
  })
);

const SendMessageField: React.FunctionComponent = () => {
  const [messageText, setMessageText] = useState("");
  const [sendMessage, { loading: sendingMessage }] = useMutation<
    SendMessageMutation,
    SendMessageMutationVariables
  >(SEND_MESSAGE, { variables: { messageText } });

  const classes = useStyles();

  return (
    <TextField
      label="Send a message"
      variant="filled"
      value={messageText}
      onChange={({ target }) => {
        setMessageText(target.value);
      }}
      onKeyDown={({ key }) => {
        if (key === "Enter") {
          sendMessage();
          setMessageText("");
        }
      }}
      className={classes.messageField}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              color="primary"
              disabled={sendingMessage}
              onClick={() => {
                sendMessage();
                setMessageText("");
              }}
            >
              <SendOutlined />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default SendMessageField;
