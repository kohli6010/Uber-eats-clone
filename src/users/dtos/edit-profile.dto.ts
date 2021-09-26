import { PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entity/user.entity';

export class EditProfileOutput extends CoreOutput {}

export class EditProfileInput extends PartialType(
  PickType(User, ['email', 'password']),
) {}
