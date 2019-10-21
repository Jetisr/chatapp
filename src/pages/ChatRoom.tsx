import React from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { LinearProgress } from "@material-ui/core";
import { ALL_MESSAGES } from "../graphql/queries";
import {
  AllMessagesQuery,
  NewMessagesSubscription
} from "../typescript/codegen";
import { SUBSCRIBE_TO_NEW_MESSAGES } from "../graphql/subscriptions";

const ChatRoom: React.FC = () => {
  const { loading, data } = useQuery<AllMessagesQuery>(ALL_MESSAGES);
  useSubscription<NewMessagesSubscription>(SUBSCRIBE_TO_NEW_MESSAGES, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const allMessages = client.readQuery<AllMessagesQuery>({
        query: ALL_MESSAGES
      });
      console.log(subscriptionData);
      client.writeQuery({
        query: ALL_MESSAGES,
        data: {
          allMessages: [
            ...allMessages!.allMessages,
            subscriptionData.data!.messageAdded
          ]
        }
      });
    }
  });

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
