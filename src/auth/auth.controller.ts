import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
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
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req: any, @Res() res: any) {
    const status = await this.appService.googleLogin(req);
    console.log(status);
    res.redirect('http://localhost:4200/?accessToken=' + status);
  }
}
