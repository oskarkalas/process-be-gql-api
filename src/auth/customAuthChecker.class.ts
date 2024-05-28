import { AuthCheckerInterface, ResolverData } from 'type-graphql';
import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { prismaClient } from '../context';

export class CustomAuthChecker implements AuthCheckerInterface {
  async check({ context }: ResolverData, roles: Role[]) {
    const token = context['req']['headers']?.authorization?.split(' ')[1];
    console.log(token);
    try {
      const user = token ? jwt.decode(token) : null;
      if (user && user['email']) {
        const dbUser = await prismaClient.user.findUnique({
          where: { email: user['email'] },
        });
        console.log(dbUser);
        return roles.includes(dbUser.role);
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}
