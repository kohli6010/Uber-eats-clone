import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entity/user.entity';

@ArgsType()
export class UserProfileInput {
  @Field((type) => Number)
  id: number;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field((type) => User, {
    nullable: true,
  })
  user?: User;
}
