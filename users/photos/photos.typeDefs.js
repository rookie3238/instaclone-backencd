import { gql } from "apollo-server";

export default gql`
  type Photo {
    id: String!
    user: User!
    file: String!
    caption: String
    hashtag: [HashTag]
    createAt: String!
    updatedAt: String!
  }

  type HashTag {
    id: String!
    hashtag: String!
    photos: [photo]
    createAt: String!
    updateAt: String!
  }
`;
