import {createWriteStream} from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import {GraphQLUpload} from "graphql-upload";


console.log(process.cwd()); ////현재 디렉터리 표시(Current Working Directory)

const resolversfn = async (
  _,
  {firstName, lastName, username, email, password: newPassword, bio, avatar},
  {loggedInUser},
)=> {
  let avatarUrl = null;
  if(avatar){
  
    const {filename, createReadStream} = await avatar; //createReadStream은 node.js에서 파일 제어 관련 module임
    const newFilename = `${loggedInUser.id}-${Date.now}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + newfilename
    )
    readStream.pipe(writeStream);
  }
  let uglyPassword = null;
  console.log(loggedInUser.id);
  if(newPassword){
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
        avatar,
        ...(uglyPassword && {password: uglyPassword}),
        ...(avatarUrl && {avatar: avatarUrl}),
      },
    });

    if(updatedUser.id){
      return {
        ok : true
      };
    }

    if(!updatedUser.id){
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
  
  Upload:GraphQLUpload,
};
