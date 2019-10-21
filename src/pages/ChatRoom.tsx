import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { LinearProgress } from "@material-ui/core";
import { ALL_MESSAGES } from "../graphql/queries";
import { AllMessagesQuery } from "../typescript/codegen";

const ChatRoom: React.FC = () => {
  const { loading, data } = useQuery<AllMessagesQuery>(ALL_MESSAGES);

  if (loading) return <LinearProgress />;

  return (
    <ul>
      {data &&
        data.allMessages.map(message => (
          <li key={message.id}>
            {message.messageText} - {message.user.username}
          </li>
        ))}
    </ul>
  );
};

export default ChatRoom;
