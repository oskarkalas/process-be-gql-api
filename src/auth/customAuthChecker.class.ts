import { AuthCheckerInterface, ResolverData } from 'type-graphql';
import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { prismaClient } from '../context';
import { jwtConstants } from './constants';

export class CustomAuthChecker implements AuthCheckerInterface {
  async check({ context }: ResolverData, roles: Role[]) {
    const token =
      context['req']['headers']?.authorization?.split(' ')[1] || null;
    try {
      const user = jwt.verify(token, jwtConstants.secret);
      if (user && user['email']) {
        const dbUser = await prismaClient.user.findUniqueOrThrow({
          where: { email: user['email'] },
        });
        return roles.includes(dbUser.role);
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}
