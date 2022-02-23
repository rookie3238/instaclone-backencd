import {gql} from "apollo-server";

export default gql`
    type Query {
        searchPhotos(kwyword:String!) :[Photo]
    }
`;