import { protectedResolver } from "../../users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        if (caption) {
        }
      }
    ),
  },
};
