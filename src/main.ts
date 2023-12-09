import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //for use same comp
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
