import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
//import { protectedProfile } from "";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword },
      { loggedInUser }
    ) => {
      console.log(loggedInUser);

      let uglyPassword = null;

      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUser = await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(uglyPassword && { password: uglyPassword }),
        },
      });

      if (updatedUser.id) {
      } else {
        return {
          ok: false,
          error: "Profile을 수정 할 수 없습니다",
        };
      }
    },
  },
};
