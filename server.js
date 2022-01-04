require("dotenv").config();

import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser } from "./users/users.utils";

const server = new ApolloServer({
  schema,

  //사용자의 프로파일을 수정할때 Muation에 일일이 토큰을 넘겨 주는 것은 비효율적
  //http header에 토근을 실어 넘겨 준다
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});
const PORT = process.env.PORT;
server
  .listen(PORT)
  .then(() => console.log(`server is running on http://localhost:${PORT}/`));
