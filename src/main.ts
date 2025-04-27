import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
    .setTitle('ZAI API 1.0')
    .setDescription('Documentação do Omnichannel ZAI')
    .setVersion('1.0')
    .build()

  const documentSwagger = () => SwaggerModule.createDocument(app, configSwagger)

  SwaggerModule.setup('docs', app, documentSwagger)

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
