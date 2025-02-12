import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { DateTimeWithAggregatesFilter } from '../inputs/DateTimeWithAggregatesFilter';
import { EnumProviderNullableListFilter } from '../inputs/EnumProviderNullableListFilter';
import { EnumRoleWithAggregatesFilter } from '../inputs/EnumRoleWithAggregatesFilter';
import { IntWithAggregatesFilter } from '../inputs/IntWithAggregatesFilter';
import { StringNullableWithAggregatesFilter } from '../inputs/StringNullableWithAggregatesFilter';
import { StringWithAggregatesFilter } from '../inputs/StringWithAggregatesFilter';

@TypeGraphQL.InputType('UserScalarWhereWithAggregatesInput', {})
export class UserScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [UserScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: UserScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: UserScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: UserScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  firstName?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  lastName?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  picture?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  email?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  password?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  refreshToken?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  createdAt?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  updatedAt?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumRoleWithAggregatesFilter, {
    nullable: true,
  })
  role?: EnumRoleWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumProviderNullableListFilter, {
    nullable: true,
  })
  provider?: EnumProviderNullableListFilter | undefined;
}
