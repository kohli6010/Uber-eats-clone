import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createAccount(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
    try{
      const isUserExisting = await this.users.findOne({
        email: createAccountInput.email
      })

      if(isUserExisting){
        return {
          ok: false,
          error: "User already existing with this email"
        }
      }

      await this.users.save(this.users.create({
        email: createAccountInput.email,
        password: createAccountInput.password,
        role: createAccountInput.role,
      }))

      return {
        ok: true
      }
    }catch(e){
      return {
        ok: false,
        error: "Couldn't create account try later!"
      }
    }
  }
}
