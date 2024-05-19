import { AuthCheckerInterface } from 'type-graphql';

export class CustomAuthChecker implements AuthCheckerInterface {
  check() {
    return true;
  }
}
