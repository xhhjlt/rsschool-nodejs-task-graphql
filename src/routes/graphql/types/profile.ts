import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberTypeIdType } from "./member-type.js";
import { UserType } from "./user.js";

export const ProfileType = new GraphQLObjectType({
  name: "Profile",
  fields: {
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    userId: {
      type: UserType.toConfig().fields.id.type,
    },
    memberTypeId: {
      type: MemberTypeIdType,
    },
  }
});