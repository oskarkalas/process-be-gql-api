import * as TypeGraphQL from 'type-graphql';

export enum UserScalarFieldEnum {
  id = 'id',
  firstName = 'firstName',
  lastName = 'lastName',
  picture = 'picture',
  email = 'email',
  password = 'password',
  refreshToken = 'refreshToken',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  role = 'role',
  provider = 'provider',
}
TypeGraphQL.registerEnumType(UserScalarFieldEnum, {
  name: 'UserScalarFieldEnum',
  description: undefined,
});
