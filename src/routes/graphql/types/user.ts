import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
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
      type: GraphQLFloat,
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

export const UserCreateInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  }),
});

export const UserChangeInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  }),
});
