import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async validateToken(requestToken: string): Promise<boolean> {
    // console.log(requestToken);
    const tokenData = this.jwtService.verify(requestToken);
    if (tokenData) {
      const user = await this.prisma.user.findUnique({
        where: { email: tokenData.email },
      });
      return !!user;
    }
    return false;
  }

  async googleLogin(req, res) {
    console.log(req.user);
    if (req.user) {
      let user = await this.prisma.user.findUnique({
        where: { email: req.user.email },
      });
      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email: req.user.email,
            firstName: req.user?.firstName,
            lastName: req.user?.lastName,
            picture: req.user?.picture,
          },
        });
      }
      const userData: Partial<User> = {
        email: user.email,
        role: Role.admin,
      };
      const jwtStatus = await this.jwtService.signAsync(userData, {
        privateKey: jwtConstants.secret,
      });
      res.redirect('http://localhost:4200/?accessToken=' + jwtStatus);
    }
  }
}
