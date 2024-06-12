import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { UserCreateproviderInput } from '../inputs/UserCreateproviderInput';
import { Role } from '../../enums/Role';

@TypeGraphQL.InputType('UserCreateInput', {})
export class UserCreateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  firstName?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  lastName?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  picture?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  email!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  password?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  refreshToken?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field((_type) => Role, {
    nullable: true,
  })
  role?: 'admin' | 'user' | 'editor' | undefined;

  @TypeGraphQL.Field((_type) => UserCreateproviderInput, {
    nullable: true,
  })
  provider?: UserCreateproviderInput | undefined;
}
