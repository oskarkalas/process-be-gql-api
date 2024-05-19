import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { applyResolversEnhanceMap } from '../prisma/generated/type-graphql';
import { Authorized } from 'type-graphql';

async function bootstrap() {
  applyResolversEnhanceMap({
    User: {
      _all: [Authorized()],
    },
  });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap().then(() => {
  console.log('graphql server running on port http://localhost:3000/graphql');
});
