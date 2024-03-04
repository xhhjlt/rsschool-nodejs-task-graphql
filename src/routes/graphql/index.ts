import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, Source, graphql, parse, validate } from 'graphql';
import { query } from './query.js';
import { mutation } from './mutation.js';
import depthLimit from 'graphql-depth-limit'

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  const schema = new GraphQLSchema({
    query,
    mutation,
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
      const validationErrors = validate(schema, parse(source), [depthLimit(5)]);
      if (validationErrors.length) {
        return { errors: validationErrors };
      }
      return await graphql({
        schema,
        source,
        contextValue: { prisma },
        variableValues,
      });;
    },
  });
};

export default plugin;
