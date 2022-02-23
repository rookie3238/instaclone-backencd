import { gql } from "apollo-server";

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    hashtags: [HashTag]
    createdAt: String!
    updatedAt: String!
  }

  type HashTag {
    id: Int!
    hashtag: String!
    photos(pages: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
