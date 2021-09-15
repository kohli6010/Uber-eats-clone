import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './users.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Query((returns) => Boolean)
  user(): boolean {
    return true;
  }
}
