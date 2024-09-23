import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { UserAvgAggregate } from '../outputs/UserAvgAggregate';
import { UserCountAggregate } from '../outputs/UserCountAggregate';
import { UserMaxAggregate } from '../outputs/UserMaxAggregate';
import { UserMinAggregate } from '../outputs/UserMinAggregate';
import { UserSumAggregate } from '../outputs/UserSumAggregate';
import { Provider } from '../../enums/Provider';
import { Role } from '../../enums/Role';

@TypeGraphQL.ObjectType('UserGroupBy', {})
export class UserGroupBy {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

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
    nullable: false,
  })
  email!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  password!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  refreshToken!: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  createdAt!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  updatedAt!: Date;

  @TypeGraphQL.Field((_type) => Role, {
    nullable: false,
  })
  role!: 'admin' | 'user' | 'editor';

  @TypeGraphQL.Field((_type) => [Provider], {
    nullable: true,
  })
  provider!: Array<
    'google' | 'facebook' | 'github' | 'microsoft' | 'local'
  > | null;

  @TypeGraphQL.Field((_type) => UserCountAggregate, {
    nullable: true,
  })
  _count!: UserCountAggregate | null;

  @TypeGraphQL.Field((_type) => UserAvgAggregate, {
    nullable: true,
  })
  _avg!: UserAvgAggregate | null;

  @TypeGraphQL.Field((_type) => UserSumAggregate, {
    nullable: true,
  })
  _sum!: UserSumAggregate | null;

  @TypeGraphQL.Field((_type) => UserMinAggregate, {
    nullable: true,
  })
  _min!: UserMinAggregate | null;

  @TypeGraphQL.Field((_type) => UserMaxAggregate, {
    nullable: true,
  })
  _max!: UserMaxAggregate | null;
}
