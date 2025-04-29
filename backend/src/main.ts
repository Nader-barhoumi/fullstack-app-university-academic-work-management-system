import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties not in DTOs
    forbidNonWhitelisted: true, // Throw error on unknown properties
    transform: true, // Transform payloads to DTO instances
  }));
  
  // Enable CORS for frontend
  app.enableCors();
  
  // Start the server
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();