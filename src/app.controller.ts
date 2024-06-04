import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('app')
  root() {
    return { message: 'Helleeeo world!' };
  }

  @Get('login')
  @Render('login')
  login() {
    return { message: 'Helleeeo world!' };
  }
}
