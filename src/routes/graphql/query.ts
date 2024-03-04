import { PrismaClient } from '@prisma/client';
import { GraphQLObjectType, GraphQLList } from 'graphql';
import { MemberTypeType } from './types/member-type.js';
import { PostType } from './types/post.js';
import { UserType } from './types/user.js';
import { ProfileType } from './types/profile.js';

export const getQuery = (prisma: PrismaClient) =>
  new GraphQLObjectType({
    name: 'Query',
    fields: {
      memberTypes: {
        type: new GraphQLList(MemberTypeType),
        resolve: async () => await prisma.memberType.findMany(),
      },
      posts: {
        type: new GraphQLList(PostType),
        resolve: async () => await prisma.post.findMany(),
      },
      users: {
        type: new GraphQLList(UserType),
        resolve: async () => await prisma.user.findMany(),
      },
      profiles: {
        type: new GraphQLList(ProfileType),
        resolve: async () => await prisma.profile.findMany(),
      },
    },
  });
