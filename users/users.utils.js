import jwt from "jsonwebtoken";
import client from "../client";


export const getUser = async (token) => {
  try {
//console.log(token);
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export function protectedResolver(ourResolver){
  return function(root,args,context,info) { //커링 기법
    if(!context.loggedInUser){
      return{
        ok: false,
        error: "로그인이 필요합니다"
      };
    }
    return ourResolver(root,args,context,info);
  };  
}