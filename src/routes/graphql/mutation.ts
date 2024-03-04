import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserChangeInputType, UserCreateInputType, UserType } from './types/user.js';
import { queryCtx } from './query.js';
import {
  ProfileChangeInputType,
  ProfileCreateInputType,
  ProfileType,
} from './types/profile.js';
import { MemberTypeId } from '../member-types/schemas.js';
import { PostChangeInputType, PostCreateInputType, PostType } from './types/post.js';
import { UUIDType } from './types/uuid.js';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        dto: {
          type: UserCreateInputType,
        },
      },
      resolve: async (_, { dto }: CreateUserArgs, { prisma }: queryCtx) =>
        await prisma.user.create({
          data: dto,
        }),
    },
    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }: { id: string }, { prisma }: queryCtx) =>
        !!(await prisma.user.delete({
          where: {
            id,
          },
        })),
    },
    changeUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
        dto: {
          type: UserChangeInputType,
        },
      },
      resolve: async (_, { id, dto }: ChangeUserArgs, { prisma }: queryCtx) =>
        await prisma.user.update({
          where: {
            id,
          },
          data: dto,
        }),
    },
    createProfile: {
      type: ProfileType,
      args: {
        dto: {
          type: ProfileCreateInputType,
        },
      },
      resolve: async (_, { dto }: CreateProfileArgs, { prisma }: queryCtx) =>
        await prisma.profile.create({
          data: dto,
        }),
    },
    deleteProfile: {
      type: GraphQLBoolean,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }: { id: string }, { prisma }: queryCtx) =>
        !!(await prisma.profile.delete({
          where: {
            id,
          },
        })),
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
        dto: {
          type: ProfileChangeInputType,
        },
      },
      resolve: async (_, { id, dto }: ChangeProfileArgs, { prisma }: queryCtx) =>
        await prisma.profile.update({
          where: {
            id,
          },
          data: dto,
        }),
    },
    createPost: {
      type: PostType,
      args: {
        dto: {
          type: PostCreateInputType,
        },
      },
      resolve: async (_, { dto }: CreatePostArgs, { prisma }: queryCtx) =>
        await prisma.post.create({
          data: dto,
        }),
    },
    deletePost: {
      type: GraphQLBoolean,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }: { id: string }, { prisma }: queryCtx) =>
        !!(await prisma.post.delete({
          where: {
            id,
          },
        })),
    },
    changePost: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
        dto: {
          type: PostChangeInputType,
        },
      },
      resolve: async (_, { id, dto }: ChangePostArgs, { prisma }: queryCtx) =>
        await prisma.post.update({
          where: {
            id,
          },
          data: dto,
        }),
    },
    subscribeTo: {
      type: UserType,
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType),
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { authorId, userId }: SubscribeArgs, { prisma }: queryCtx) =>
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            userSubscribedTo: {
              create: {
                authorId,
              },
            },
          },
        }),
    },
    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType),
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { authorId, userId }: SubscribeArgs, { prisma }: queryCtx) =>
        !!(await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId: authorId,
            },
          },
        })),
    },
  },
});

interface UserDto {
  name: string;
  balance: number;
}

interface CreateUserArgs {
  dto: UserDto;
}

interface ChangeUserArgs {
  id: string;
  dto: Partial<UserDto>;
}

interface ProfileDto {
  userId: string;
  memberTypeId: MemberTypeId;
  yearOfBirth: number;
  isMale: boolean;
}

interface CreateProfileArgs {
  dto: ProfileDto;
}

interface ChangeProfileArgs {
  id: string;
  dto: Partial<ProfileDto>;
}

interface PostDto {
  title: string;
  content: string;
  authorId: string;
}

interface CreatePostArgs {
  dto: PostDto;
}

interface ChangePostArgs {
  id: string;
  dto: Partial<PostDto>;
}

interface SubscribeArgs {
  userId: string;
  authorId: string;
}
