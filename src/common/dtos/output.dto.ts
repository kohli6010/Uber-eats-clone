import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entity/user.entity";

@ObjectType()
export class CoreOutput {
  @Field((type) => String, {
    nullable: true,
  })
  error?: string;

  @Field((type) => Boolean)
  ok: boolean;
}