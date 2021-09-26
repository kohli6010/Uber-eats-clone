import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/guards/auth-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { User } from './entity/user.entity';
import { UserService } from './users.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User): User {
    return authUser;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const user = await this.userService.createAccount(createAccountInput);
      return user;
    } catch (e) {
      return e;
    }
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      const output = await this.userService.login(loginInput);
      return output;
    } catch (e) {
      return e;
    }
  }

  @Mutation((returns) => UserProfileOutput)
  async userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    try {
      const id = userProfileInput.id;
      const user = await this.userService.findById(id);
      if (user) {
        return {
          ok: true,
          user: user,
        };
      } else {
        throw Error();
      }
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  @Mutation((returns) => EditProfileOutput)
  @UseGuards(AuthGuard)
  async updateProfile(
    @AuthUser() user: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const response = await this.userService.updateUserProfile(
        user.id,
        editProfileInput,
      );
      if (response.affected) {
        return {
          ok: true,
          error: null,
        };
      } else {
        throw Error('INTERNAL SERVER ERROR');
      }
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }
}
