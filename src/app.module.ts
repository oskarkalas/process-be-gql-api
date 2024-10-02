import { Module } from '@nestjs/common';
import { GraphQLTimestamp } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeGraphQLModule } from 'typegraphql-nestjs';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomAuthChecker } from './auth/customAuthChecker.class';
import { jwtConstants } from './auth/constants';
import { prismaClient } from './context';
import {
  CatalogCrudResolver,
  CatalogRelationsResolver,
  UserCrudResolver,
  UserRelationsResolver,
} from '../prisma/generated/type-graphql';
import { UserResolver } from './user/user.resolver';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GoogleStrategy } from './quards/google.strategy';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Serve from the correct directory
      renderPath: '/', // Define the correct render path, usually the root
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
    PrismaModule,
    CustomAuthChecker,
    TypeGraphQLModule.forRoot({
      driver: ApolloDriver,
      path: '/',
      emitSchemaFile: true,
      scalarsMap: [{ type: Date, scalar: GraphQLTimestamp }],
      authChecker: CustomAuthChecker,
      validate: false,
      context: (req: any) => ({ ...req, prisma: prismaClient }),
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    UserCrudResolver,
    CatalogCrudResolver,
    UserResolver,
    UserRelationsResolver,
    CatalogRelationsResolver,
    GoogleStrategy,
  ],
})
export class AppModule {}
