import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RestaurantsModule } from './restaurants/restaurants.module';
import * as path from 'path';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entity/user.entity';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(process.cwd(), 'src/schema.graphql'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_PORT: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        SECRET_KEY: Joi.string().required()
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: +process.env.DB_PORT,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
