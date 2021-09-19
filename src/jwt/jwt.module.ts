import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constant';
import { JwtService } from './jwt.service';
import { JwtOptions } from './jwt-options.interface';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtOptions): DynamicModule{
    return {
      module: JwtModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService]
    }
  }
}
