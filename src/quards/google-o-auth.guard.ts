import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  constructor(private configService: ConfigService) {
    console.log('GoogleOAuthGuard');
    super({
      accessType: 'offline',
      configService: ConfigService,
    });
  }
}
