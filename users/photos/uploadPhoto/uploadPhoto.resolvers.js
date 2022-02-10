import client from "../../../client";
import { protectedResolver } from "../../users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        console.log(caption);
        if (caption) {
          const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
          hashtagObj = hashtags.map((hashtag)=>({
            where:{hashtag},
            create:{hashtag},
          }));
          console.log(hashtagObj);
        }

        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect:{
                id:loggedInUser.id,
              }
            },
            
            ...(hashtagObj.length>0 && {
              hashtags:{
                connectOrCreate: hashtagObj,
              },
            }),
          },
        },
      );
      }
    ),
  },
};
