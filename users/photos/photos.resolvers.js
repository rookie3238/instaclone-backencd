import client from "../../client";

export default{
    Photo: {
        user:({userId}) => client.user.findUnique({where: {id: userId}}),
        hashtags: ({id}) =>
            client.hashTag.findMany({
                where: {
                    photos: {
                        some: {
                            id,
                        },
                    },
                },
            }),
    },

    HashTag:{
        photos: ({id},{page}, {loggedInUser}) =>{
            return client.hashTag
                .findUnique({
                    where: {
                        id,
                    },
                })
                .photos();
        },

        totalPhotos:() => 
            client.hashTag.count({
                where: {
                    hashtags: {
                        some: {
                            id,
                        },
                    },

                },
            }),
    },
};