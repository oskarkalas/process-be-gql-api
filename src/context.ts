import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient({
  log: ['error'],
});

export interface Context {
  prisma: PrismaClient;
}

export const context: Context = {
  prisma: prismaClient,
};
