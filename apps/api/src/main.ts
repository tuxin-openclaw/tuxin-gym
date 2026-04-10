import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedDatabase } from './database/seeds/seed-data';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const dataSource = app.get(DataSource);
  await seedDatabase(dataSource);

  await app.listen(3000);
  console.log('API is running on http://localhost:3000');
}

bootstrap();
