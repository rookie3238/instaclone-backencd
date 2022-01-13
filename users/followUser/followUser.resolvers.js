import client from "../../client";
import {protectedResolver} from "../users.utils";

export default {
    Mutation : {
        followUser: protectedResolver( async (_, {username}, {loggedInUser})=>{
            const ok = await client.user.findUnique({where : {username}});
            if (!ok) {
                return {
                    ok:false,
                    error : "해당 계정이 없습니다"
                };
            }
            await client.user.update({
                where : {
                    id : loggedInUser,
                },
                data: {
                  following: {
                      connect: {
                          username,
                      },
                  },  
                },    
            });
        }
    )

}

}