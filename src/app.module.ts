import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLTimestamp } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserCrudResolver } from '../prisma/generated/type-graphql';

import { TypeGraphQLModule } from 'typegraphql-nestjs';
import { context } from './context';

import { UserResolver } from './user/user.resolver';
import { CustomAuthChecker } from './auth/customAuthChecker.class';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
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
  providers: [AppService, UserCrudResolver, UserResolver],
})
export class AppModule {}
