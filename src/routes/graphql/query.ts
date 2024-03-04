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
      resolve: async (_source, _args, { prisma }: queryCtx) =>
        await prisma.memberType.findMany(),
    },
    memberType: {
      type: MemberTypeType,
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeIdType),
        },
      },
      resolve: async (__source, { id }: { id: MemberTypeId }, { prisma }: queryCtx) =>
        await prisma.memberType.findUnique({ where: { id } }),
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (__source, _args, { prisma }: queryCtx) =>
        await prisma.post.findMany(),
    },
    post: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_source, { id }: { id: string }, { prisma }: queryCtx) =>
        await prisma.post.findUnique({ where: { id } }),
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_source, _args, { prisma }: queryCtx) =>
        await prisma.user.findMany(),
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_source, { id }: { id: string }, { prisma }: queryCtx) =>
        await prisma.user.findUnique({ where: { id } }),
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_source, _args, { prisma }: queryCtx) =>
        await prisma.profile.findMany(),
    },
    profile: {
      type: ProfileType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_source, { id }: { id: string }, { prisma }: queryCtx) =>
        await prisma.profile.findUnique({ where: { id } }),
    },
  },
});
