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
import { UserCrudResolver } from '../prisma/generated/type-graphql';
import { UserResolver } from './user/user.resolver';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GoogleStrategy } from './quards/google.strategy';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      renderPath: 'public',
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
    PrismaModule,
    TypeGraphQLModule.forRootAsync({
      imports: [CustomAuthChecker],
      driver: ApolloDriver,
      useFactory: async () => ({
        cors: true,
        playground: true,
        authChecker: CustomAuthChecker,
        scalarsMap: [{ type: Date, scalar: GraphQLTimestamp }],
        emitSchemaFile: true,
        context: (req: any) => ({ ...req, prisma: prismaClient }),
      }),
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, UserCrudResolver, UserResolver, GoogleStrategy],
})
export class AppModule {}
