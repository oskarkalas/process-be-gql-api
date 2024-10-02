import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { CatalogListRelationFilter } from '../inputs/CatalogListRelationFilter';
import { DateTimeFilter } from '../inputs/DateTimeFilter';
import { EnumProviderNullableListFilter } from '../inputs/EnumProviderNullableListFilter';
import { EnumRoleFilter } from '../inputs/EnumRoleFilter';
import { StringNullableFilter } from '../inputs/StringNullableFilter';
import { UserWhereInput } from '../inputs/UserWhereInput';

@TypeGraphQL.InputType('UserWhereUniqueInput', {})
export class UserWhereUniqueInput {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  id?: number | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  email?: string | undefined;

  @TypeGraphQL.Field((_type) => [UserWhereInput], {
    nullable: true,
  })
  AND?: UserWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserWhereInput], {
    nullable: true,
  })
  OR?: UserWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserWhereInput], {
    nullable: true,
  })
  NOT?: UserWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  firstName?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  lastName?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  picture?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  password?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  refreshToken?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  updatedAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumRoleFilter, {
    nullable: true,
  })
  role?: EnumRoleFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumProviderNullableListFilter, {
    nullable: true,
  })
  provider?: EnumProviderNullableListFilter | undefined;

  @TypeGraphQL.Field((_type) => CatalogListRelationFilter, {
    nullable: true,
  })
  catalog?: CatalogListRelationFilter | undefined;
}
