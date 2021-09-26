import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtMiddleware } from 'src/jwt/jwt.middleware';
import { User } from './entity/user.entity';
import { Verification } from './entity/verification.entity';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UsersModule{}
