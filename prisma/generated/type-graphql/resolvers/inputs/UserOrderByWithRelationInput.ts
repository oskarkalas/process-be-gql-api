import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { CatalogOrderByRelationAggregateInput } from '../inputs/CatalogOrderByRelationAggregateInput';
import { SortOrderInput } from '../inputs/SortOrderInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('UserOrderByWithRelationInput', {})
export class UserOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrderInput, {
    nullable: true,
  })
  firstName?: SortOrderInput | undefined;

  @TypeGraphQL.Field((_type) => SortOrderInput, {
    nullable: true,
  })
  lastName?: SortOrderInput | undefined;

  @TypeGraphQL.Field((_type) => SortOrderInput, {
    nullable: true,
  })
  picture?: SortOrderInput | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  email?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrderInput, {
    nullable: true,
  })
  password?: SortOrderInput | undefined;

  @TypeGraphQL.Field((_type) => SortOrderInput, {
    nullable: true,
  })
  refreshToken?: SortOrderInput | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  createdAt?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  updatedAt?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  role?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  provider?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => CatalogOrderByRelationAggregateInput, {
    nullable: true,
  })
  catalog?: CatalogOrderByRelationAggregateInput | undefined;
}
