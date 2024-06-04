import { Controller, Get, Redirect, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('app')
  root() {
    return { message: 'jsem v appce' };
  }

  @Get('login')
  @Render('login')
  login() {
    return { message: 'Musim se prihlasit' };
  }

  @Get('app')
  @Redirect('/', 302)
  app() {
    const logged = true;
    if (logged) {
      return { url: '/' };
    }
  }

}
