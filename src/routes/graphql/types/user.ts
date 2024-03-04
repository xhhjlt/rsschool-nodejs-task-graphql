import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import type { queryCtx } from '../query.js';
import { PostType } from './post.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLInt,
    },
    profile: {
      type: ProfileType,
      resolve: async ({ id }: { id: string }, _args, { prisma }: queryCtx) =>
        await prisma.profile.findUnique({ where: { userId: id } }),
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: { id: string }, _args, { prisma }: queryCtx) =>
        await prisma.post.findMany({ where: { authorId: id } }),
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: { id: string }, _args, { prisma }: queryCtx) =>
        await prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: id,
              },
            },
          },
        }),
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: { id: string }, _args, { prisma }: queryCtx) =>
        await prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        }),
    },
  }),
});
