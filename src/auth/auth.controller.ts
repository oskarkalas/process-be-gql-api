import {
  Controller,
  Get,
  Header,
  Request,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from '../app.service';

@Controller('auth')
export class AuthController {
  constructor(private appService: AppService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req: any) {
    console.log(req);
  }

  @Get('google-redirect')
  @Header('Cache-Control', 'none')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req: any, @Res() res: any) {
    return await this.appService.googleLogin(req, res);
  }

  @Get('validate-user-token')
  @Header('Cache-Control', 'none')
  async validateToken(@Query('accessToken') accessToken: string) {
    return await this.appService.validateToken(accessToken);
  }
}
