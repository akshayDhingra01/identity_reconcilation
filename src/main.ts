import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadGatewayException, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);    
  await app.listen(process.env.PORT);
}
bootstrap();


    // this.usersRepository.query(`delete from contact where email = 'akshay.quest.com'`)
    // return3
    