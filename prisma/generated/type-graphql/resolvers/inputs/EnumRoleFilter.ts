import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { NestedEnumRoleFilter } from '../inputs/NestedEnumRoleFilter';
import { Role } from '../../enums/Role';

@TypeGraphQL.InputType('EnumRoleFilter', {})
export class EnumRoleFilter {
  @TypeGraphQL.Field((_type) => Role, {
    nullable: true,
  })
  equals?: 'admin' | 'user' | 'editor' | undefined;

  @TypeGraphQL.Field((_type) => [Role], {
    nullable: true,
  })
  in?: Array<'admin' | 'user' | 'editor'> | undefined;

  @TypeGraphQL.Field((_type) => [Role], {
    nullable: true,
  })
  notIn?: Array<'admin' | 'user' | 'editor'> | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumRoleFilter, {
    nullable: true,
  })
  not?: NestedEnumRoleFilter | undefined;
}
