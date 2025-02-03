import { Request } from 'express';
import { UserPayload } from './users-login.interface';

export interface ExpressRequestWithUser extends Request {
  user: UserPayload & { iat: number; exp: number };
}
