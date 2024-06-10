import 'reflect-metadata';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Authorized } from 'type-graphql';
import { Role } from '@prisma/client';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { applyResolversEnhanceMap } from '../prisma/generated/type-graphql';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  applyResolversEnhanceMap({
    User: {
      users: [Authorized(Role.admin)],
      aggregateUser: [Authorized(Role.admin)],
      user: [Authorized(Role.admin)],
    },
  });
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useStaticAssets(join(__dirname, '..', '../public'), {
    prefix: '/public/',
  });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(1337);
}
bootstrap().then(() => {
  console.log('graphql server running on port http://localhost:1337/graphql');
});
