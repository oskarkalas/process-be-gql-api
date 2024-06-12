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
  async googleLogin(googleResponse) {
    if (googleResponse.user) {
      let user = await this.prisma.user.findUnique({
        where: { email: googleResponse.user.email },
      });
      if (!user && googleResponse.user.email) {
        user = await this.prisma.user.create({
          data: {
            email: googleResponse.user.email,
            firstName: googleResponse.user?.firstName,
            lastName: googleResponse.user?.lastName,
            picture: googleResponse.user?.picture,
          },
        });
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
