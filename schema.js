import {
  loadFilesSync,
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
//Graphql Type 정의시 하위 디렉토리에서 뒤의 확장자가 typeDef.js로 끝나는 것들을 참조
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);
//Graphql Resolver 정의시 하위 디렉토리에서 뒤의 확장자가 resolver.js로 끝나는 것 들을 참조
const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
