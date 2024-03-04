import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';

export const MemberTypeIdType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: {
      value: 'basic',
    },
    BUSINESS: {
      value: 'business',
    },
  },
});

export const MemberTypeType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: {
      type: MemberTypeIdType,
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
  },
});
