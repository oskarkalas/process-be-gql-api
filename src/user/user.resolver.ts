import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { JwtService } from '@nestjs/jwt';
import { Context } from '../context';
import { User } from '@prisma/client';
import { jwtConstants } from '../auth/constants';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  constructor(private jwtService: JwtService) {}
  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { prisma }: Context,
  ) {
    const user = await prisma.user.findUnique({ where: { email, password } });
    if (!user) {
      throw new Error('wrong username or password');
    }
    const userData: Partial<User> = {
      email: user.email,
      role: user.role,
    };
    return {
      accessToken: await this.jwtService.signAsync(userData, {
        privateKey: jwtConstants.secret,
      }),
    };
  }
}
