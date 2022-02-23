import client from "../../../client";
import { protectedResolver } from "../../users.utils";
import {processHashtags} from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        //console.log(caption);
        if (caption) {
          hashtagObj = processHashtags(caption);
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
