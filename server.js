require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import {graphqlUploadExpress} from "graphql-upload";
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";

import {typeDefs, resolvers} from "./schema";
import { getUser } from "./users/users.utils";

const PORT =process.env.PORT;


const startApollo = async() => {

  
const apollo = new ApolloServer({
  resolvers,
  typeDefs,

  //사용자의 프로파일을 수정할때 Muation에 일일이 토큰을 넘겨 주는 것은 비효율적
  //http header에 토근을 실어 넘겨 준다
  context: async ({ req }) => {
    
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },

  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  
});


await apollo.start();
const app = express();


app.use(graphqlUploadExpress());
app.use(logger("tiny"));
apollo.applyMiddleware({app});
app.use("/static", express.static("uploads"));

await new Promise ((func)=> app.listen({port : PORT},func));
console.log(`Server: http://localhost:${PORT} ${apollo.graphqlPath}`);
} 

startApollo();


/*
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
     };
   },
 });

 await server.start(); 

 const app = express();
 app.use(logger("tiny"));
 server.applyMiddleware({ app });
 app.listen({ port: PORT }, () => {
   console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
 });

 */