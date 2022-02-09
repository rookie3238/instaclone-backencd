import { gql } from "apollo-server";

export default gql`
  type searchUserResult {
    users: [User]
  }
  type Query {
    searchUsers(keyword: String!, page: Int): searchUserResult
  }
`;
