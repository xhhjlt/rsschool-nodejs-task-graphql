import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, Source, graphql } from 'graphql';
import { getQuery } from './query.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  const schema = new GraphQLSchema({
    query: getQuery(prisma),
  });
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables: variableValues } = req.body;
      const source = new Source(query);
      const result = await graphql({
        schema,
        source,
        variableValues,
      });
      return result;
    },
  });
};

export default plugin;
