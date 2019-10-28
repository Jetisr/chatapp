import { withFilter } from "apollo-server";
import {
  SubscriptionResolvers,
  SubscriptionMessageEditedArgs
} from "../../typescript/codegen";
import { pubsub } from "./base";
import Message from "../../entities/message";

const Subscription: SubscriptionResolvers = {
  messageAdded: {
    subscribe: () => pubsub.asyncIterator(["MESSAGE_ADDED"])
  },
  messageDeleted: {
    subscribe: () => pubsub.asyncIterator(["MESSAGE_DELETED"])
  },
  messageEdited: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(["MESSAGE_EDITED"]),
      (
        payload: { messageEdited: Message },
        variables: SubscriptionMessageEditedArgs
      ) => {
        if (variables.messageId) {
          return payload.messageEdited.id === variables.messageId;
        }
        return true;
      }
    )
  }
};

export default Subscription;
