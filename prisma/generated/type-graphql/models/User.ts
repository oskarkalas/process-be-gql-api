import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../scalars';
import { Catalog } from '../models/Catalog';
import { Provider } from '../enums/Provider';
import { Role } from '../enums/Role';
import { UserCount } from '../resolvers/outputs/UserCount';

@TypeGraphQL.ObjectType('User', {})
export class User {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  firstName?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  lastName?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  picture?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  email!: string;

  catalog?: Catalog[];

  password?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  refreshToken?: string | null;

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
    nullable: false,
  })
  provider!: Array<'google' | 'facebook' | 'github' | 'microsoft'>;

  @TypeGraphQL.Field((_type) => UserCount, {
    nullable: true,
  })
  _count?: UserCount | null;
}
