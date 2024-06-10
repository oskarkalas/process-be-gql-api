import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { User } from '../../prisma/generated/type-graphql';
import { JwtService } from '@nestjs/jwt';
import { Context } from '../context';
import { jwtConstants } from '../auth/constants';

@ObjectType()
class LoginResponse {
  @Field()
  jwt: string;
  @Field()
  user: User;
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
      user: user,
      jwt: await this.jwtService.signAsync(userData, {
        privateKey: jwtConstants.secret,
      }),
    };
  }

  @Mutation(() => LoginResponse)
  async registerNewUser(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { prisma }: Context,
  ) {
    const user = await prisma.user.create({ data: { email, password } });
    if (!user) {
      throw new Error('wrong username or password');
    }
    const userData: Partial<User> = {
      email: user.email,
      role: user.role,
    };
    return {
      user: user,
      jwt: await this.jwtService.signAsync(userData, {
        privateKey: jwtConstants.secret,
      }),
    };
  }

  @Query(() => User)
  async Me(@Ctx() { req, prisma }) {
    const jwt = req['headers']?.authorization?.split(' ')[1] || null;
    const jwtData = this.jwtService.verify(jwt);
    const user = await prisma.user.findUnique({
      where: { email: jwtData.email },
    });
    if (!user) {
      throw new Error('wrong username or password');
    }
    return user;
  }
}
