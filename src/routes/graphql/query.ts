import { PrismaClient } from '@prisma/client';
import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import { MemberTypeIdType, MemberTypeType } from './types/member-type.js';
import { PostType } from './types/post.js';
import { UserType } from './types/user.js';
import { ProfileType } from './types/profile.js';
import { MemberTypeId } from '../member-types/schemas.js';
import { UUIDType } from './types/uuid.js';

export interface queryCtx {
  prisma: PrismaClient;
}

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberTypeType),
      resolve: async (_, _args, { prisma }: queryCtx) =>
        await prisma.memberType.findMany(),
    },
    memberType: {
      type: MemberTypeType,
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeIdType),
        },
      },
      resolve: async (__, { id }: { id: MemberTypeId }, { prisma }: queryCtx) =>
        await prisma.memberType.findUnique({ where: { id } }),
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (__, _args, { prisma }: queryCtx) => await prisma.post.findMany(),
    },
    post: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }: { id: string }, { prisma }: queryCtx) =>
        await prisma.post.findUnique({ where: { id } }),
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_, _args, { prisma }: queryCtx) => await prisma.user.findMany(),
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }: { id: string }, { prisma }: queryCtx) =>
        await prisma.user.findUnique({ where: { id } }),
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_, _args, { prisma }: queryCtx) => await prisma.profile.findMany(),
    },
    profile: {
      type: ProfileType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }: { id: string }, { prisma }: queryCtx) =>
        await prisma.profile.findUnique({ where: { id } }),
    },
  },
});
