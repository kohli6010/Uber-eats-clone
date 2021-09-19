import { Inject, Injectable } from '@nestjs/common';
import { JwtOptions } from './jwt-options.interface';
import { CONFIG_OPTIONS } from './jwt.constant';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
    constructor(
        @Inject(CONFIG_OPTIONS)
        private readonly jwtOptions: JwtOptions
    ){}

    sign(id: number): string{
        return jwt.sign({id}, this.jwtOptions.SECRET_KEY);
    }

    verify(token: string): object{
        return <object><any>jwt.verify(token, this.jwtOptions.SECRET_KEY);
    }
}
