import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UserService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    try {
      if ('x-jwt' in req.headers) {
        const token = req.headers['x-jwt'];
        const payload: any = this.jwtService.verify(token);
        if (payload && payload.id) {
          const user = await this.userService.findById(payload.id);
          req['user'] = user;
        }

        next();
      }
    } catch (e) {
      throw e;
    }
  }
}
