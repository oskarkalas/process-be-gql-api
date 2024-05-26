import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { JwtService } from '@nestjs/jwt';
import { Context } from '../context';

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
      throw new Error('Bad username or password');
    }
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
