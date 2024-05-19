import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLTimestamp } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserCrudResolver } from '../prisma/generated/type-graphql';

import { TypeGraphQLModule } from 'typegraphql-nestjs';
import { context } from './context';
import { CustomAuthChecker } from './customAuthChecker.class';

@Module({
  imports: [
    TypeGraphQLModule.forRootAsync({
      imports: [CustomAuthChecker],
      driver: ApolloDriver,
      useFactory: async () => ({
        cors: true,
        playground: true,
        authChecker: CustomAuthChecker,
        scalarsMap: [{ type: Date, scalar: GraphQLTimestamp }],
        emitSchemaFile: true,
        context: context,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserCrudResolver],
})
export class AppModule {}
