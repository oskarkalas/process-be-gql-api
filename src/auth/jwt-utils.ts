import jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';



export function verifyToken(token: string): any {
  try {
    return jwt.decode(token);
  } catch (e) {
    return null;
  }
}
