import * as TypeGraphQL from 'type-graphql';

export enum Role {
  admin = 'admin',
  user = 'user',
  editor = 'editor',
}
TypeGraphQL.registerEnumType(Role, {
  name: 'Role',
  description: undefined,
});
