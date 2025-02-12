import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { SortOrderInput } from '../inputs/SortOrderInput';
import { UserAvgOrderByAggregateInput } from '../inputs/UserAvgOrderByAggregateInput';
import { UserCountOrderByAggregateInput } from '../inputs/UserCountOrderByAggregateInput';
import { UserMaxOrderByAggregateInput } from '../inputs/UserMaxOrderByAggregateInput';
import { UserMinOrderByAggregateInput } from '../inputs/UserMinOrderByAggregateInput';
import { UserSumOrderByAggregateInput } from '../inputs/UserSumOrderByAggregateInput';
import { SortOrder } from '../../enums/SortOrder';

@TypeGraphQL.InputType('UserOrderByWithAggregationInput', {})
export class UserOrderByWithAggregationInput {
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

  @TypeGraphQL.Field((_type) => UserCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: UserCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => UserAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: UserAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => UserMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: UserMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => UserMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: UserMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => UserSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: UserSumOrderByAggregateInput | undefined;
}
