import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @Field((isA) => Number)
  id: number;

  @Column()
  @Field((isA) => String)
  @IsString()
  categoryName: string;

  @Column()
  @Field((isA) =>String)
  @IsString()
  address: string;

  @Column({default: true})
  @Field((isA) => Boolean, {
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isVegan?: boolean;

  @Column()
  @Field((isA) => String)
  @IsString()
  ownersName: string;

  @Column()
  @Field((isA) => String)
  @IsString()
  @Length(5)
  name: string;
}
