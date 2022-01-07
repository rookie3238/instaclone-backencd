import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolversfn = async (
  _,
  {firstName, lastName, username, email, password, newPassword, bio, avarta},
  {loggedInUser},
)=> {
  let uglyPassword = null;
  console.log(avarta);
  if(newpassword){
    uglyPassword = await bcrypt.hash(newPassword,10);
  }
  const updatedUser = await client.user.update(
    {
      where: {
        id: loggedInUser.id,
      },
      data: {
        firstName,
        lastName,
        username,
        email, 
        bio,
        avarta,
        ...(uglyPassword && {password: uglyPassword}),
      },
    });

    if(updatedUser.id){
      return{
        ok:false,
        error: "사용자 정보를 갱신 할 수 없습니다",
      };
    }
  };
export default {
  Mutation: {
   editProfile: protectedResolver(resolversfn),  
  },
};
