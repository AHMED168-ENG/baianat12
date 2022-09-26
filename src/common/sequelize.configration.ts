import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

console.log(process.env.USERNAME);

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.DB_USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class sequelizeCofigration {}
