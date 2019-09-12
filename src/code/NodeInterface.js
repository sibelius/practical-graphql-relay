import { fromGlobalId, nodeDefinitions } from 'graphql-relay';
import { GraphQLObjectType } from 'graphql';

import * as loaders from '../loader';

const registeredTypes = {};

export function registerType(type: GraphQLObjectType) {
  registeredTypes[type.name] = type;
  return type;
}

export const { nodeField, nodeInterface } = nodeDefinitions(
  (globalId, context) => {
    const { type, id } = fromGlobalId(globalId);

    const loader = (loaders)[`${type}Loader`];

    return (loader && loader.load(context, id)) || null;
  },
  object => registeredTypes[object.constructor.name] || null,
);
