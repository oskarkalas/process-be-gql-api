import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public testMethode(): string {
    return 'test xxxxxx';
  }
}
