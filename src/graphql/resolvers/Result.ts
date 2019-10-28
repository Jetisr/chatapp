import { ResultResolvers } from "../../typescript/codegen";

const Result: ResultResolvers = {
  __resolveType: (root, args) => {
    if ("user" in root) {
      return "CreateUserResult";
    }

    if ("token" in root) {
      return "LoginResult";
    }

    if ("sentMessage" in root) {
      return "SendMessageResult";
    }

    if ("editedMessage" in root) {
      return "EditMessageResult";
    }

    if ("imageLocation" in root) {
      return "AddAvatarResult";
    }

    return "DeleteMessageResult";
  }
};

export default Result;
