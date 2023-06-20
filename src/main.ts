import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadGatewayException, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.PORT);
  
  await app.listen(process.env.PORT);
}
bootstrap();
