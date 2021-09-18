import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entity/user.entity';
import * as JWT from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const isUserExisting = await this.users.findOne({
        email: createAccountInput.email,
      });

      if (isUserExisting) {
        return {
          ok: false,
          error: 'User already existing with this email',
        };
      }

      await this.users.save(
        this.users.create({
          email: createAccountInput.email,
          password: createAccountInput.password,
          role: createAccountInput.role,
        }),
      );

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: "Couldn't create account try later!",
      };
    }
  }

  async login(loginInput: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({
        email: loginInput.email,
      });

      if (!user) {
        return {
          ok: false,
          error: 'No user found!',
        };
      }

      const isUserCorrect = await user.checkPassword(loginInput.password);
      if (isUserCorrect) {
        return {
          ok: true,
          token: JWT.sign(
            {
              id: user.id,
            },
            this.configService.get('SECRET_KEY'),
          ),
        };
      }

      return {
        ok: false,
        error: "Either your email or password is wrong"
      }
    } catch (e) {
      return {
        ok: false,
        error: "Couldn't complete request please try agin later!",
      };
    }
  }
}
