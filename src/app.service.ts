import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { jwtConstants } from './auth/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async googleLogin(res) {
    if (res.user) {
      console.log(res.user)
      const user = await this.prisma.user.findUnique({
        where: { email: res.user.email },
      });
      if (!user) {
        throw new Error('wrong username or password');
      }
      const userData: Partial<User> = {
        email: user.email,
        role: Role.admin,
      };
      return await this.jwtService.signAsync(userData, {
        privateKey: jwtConstants.secret,
      });
    }
  }
}
