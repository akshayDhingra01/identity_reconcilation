import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm'
import { ConfigModule} from '@nestjs/config'
// import { }

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true
    }),
    TypeOrmModule.forRoot({
      type : 'mysql',
      name : 'default',
      host : process.env.MYSQL_HOST,
      port : Number(process.env.MYSQL_PORT),
      username : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASSWORD,
      database : process.env.MYSQL_DATABASE,
      entities : ["dist/orm/*.entity{.ts,.js}"],
      synchronize : false,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
