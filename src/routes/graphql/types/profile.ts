import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
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

export const ProfileCreateInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    memberTypeId: {
      type: new GraphQLNonNull(MemberTypeIdType),
    },
  }),
});

export const ProfileChangeInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: MemberTypeIdType,
    },
  }),
});
