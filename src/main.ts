import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Activamos el pipe para poder ser utilizado
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Quita todos los atributos que esten de mas o no esten definidos en el dtos
      forbidNonWhitelisted: true, //Alerta sobre los atributos que esten de mas o no esten definidos en el dtos
    }),
  );
  await app.listen(3000);
}
bootstrap();
