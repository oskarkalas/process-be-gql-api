import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { User } from '../../prisma/generated/type-graphql';
import { JwtService } from '@nestjs/jwt';
import { Context } from '../context';
import { jwtConstants } from '../auth/constants';
import * as bcrypt from 'bcryptjs';

@ObjectType()
class LoginResponse {
  @Field()
  jwt: string;
  @Field()
  user: User;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  constructor(private jwtService: JwtService) {}
  @Mutation(() => LoginResponse)
  async login(
    @Arg('loginInput') loginInput: LoginInput,
    @Ctx() { prisma }: Context,
  ) {
    const user = await prisma.user.findUnique({
      where: { email: loginInput.email },
    });
    if (user && !user.password && user.provider) {
      throw new Error(user.provider.toString());
    }
    const match = await bcrypt.compare(loginInput.password, user.password);

    if (!match) {
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
    @Arg('loginInput') loginInput: LoginInput,
    @Ctx() { prisma }: Context,
  ) {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(loginInput.password, saltRounds);
    const user = await prisma.user.create({
      data: { email: loginInput.email, password: hashedPassword },
    });
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
