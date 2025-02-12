import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { Role } from '../../enums/Role';

@TypeGraphQL.ObjectType('UserMaxAggregate', {})
export class UserMaxAggregate {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  id!: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  firstName!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  lastName!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  picture!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  email!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  password!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  refreshToken!: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  createdAt!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  updatedAt!: Date | null;

  @TypeGraphQL.Field((_type) => Role, {
    nullable: true,
  })
  role!: 'admin' | 'user' | 'editor' | null;
}
