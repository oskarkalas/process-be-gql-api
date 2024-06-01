import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { applyResolversEnhanceMap } from '../prisma/generated/type-graphql';

import { Authorized } from 'type-graphql';
import { Role } from '@prisma/client';

async function bootstrap() {
  applyResolversEnhanceMap({
    User: {
      users: [Authorized(Role.admin)],
      aggregateUser: [Authorized(Role.admin)],
      user: [Authorized(Role.admin)],
    },
  });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap().then(() => {
  console.log('graphql server running on port http://localhost:3000/graphql');
});
