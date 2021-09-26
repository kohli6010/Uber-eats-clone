import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsBoolean, IsEmail, IsEnum } from 'class-validator';


enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery',
}

registerEnumType(UserRole, {
  name: 'UserRole'
})

@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column()
  @Field((type) => String)
  password: string;

  @Column({type: 'enum', enum: UserRole})
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Field(() => Boolean)
  @Column()
  @IsBoolean()
  verified: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword():Promise<void>{
    try{
      this.password = await bcrypt.hash(this.password, 10);
      return;
    }catch(e){
      console.log(e);
      throw new InternalServerErrorException()
    }
  }

  async checkPassword(password: string): Promise<boolean>{
    try{
      return await bcrypt.compare(password, this.password);
    }catch(e){
      console.log(e);
      throw e;
    }
  }
}
