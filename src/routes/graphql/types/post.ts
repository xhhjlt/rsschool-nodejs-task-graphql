import { GraphQLObjectType, GraphQLString } from "graphql"
import { UUIDType } from "./uuid.js";
import { UserType } from "./user.js";

export const PostType = new GraphQLObjectType({
  name: "Post",
  fields: {
    id: {
      type: UUIDType,
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: UserType.toConfig().fields.id.type,
    },
  }
});