import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeIdType, MemberTypeType } from './member-type.js';
import { UserType } from './user.js';
import { queryCtx } from '../query.js';

interface Parent {
  userId: string;
  memberTypeId: string;
}

export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
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
      type: UUIDType,
    },
    user: {
      type: UserType,
      resolve: async ({ userId }: Parent, _args, { prisma }: queryCtx) =>
        await prisma.user.findUnique({ where: { id: userId } }),
    },
    memberTypeId: {
      type: MemberTypeIdType,
    },
    memberType: {
      type: MemberTypeType,
      resolve: async ({ memberTypeId }: Parent, _args, { prisma }: queryCtx) =>
        await prisma.memberType.findUnique({ where: { id: memberTypeId } }),
    },
  }),
});
