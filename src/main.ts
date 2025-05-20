import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './app/interceptors/response.interceptor';
import { HttpExceptionFilter } from './app/interceptors/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = new Reflector();

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });


  const configSwagger = new DocumentBuilder()
    .setTitle('ZAI API 1.0')
    .setDescription('Documentação do Omnichannel ZAI')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://localhost:' + (process.env.PORT ?? 3000))
    .build()

  const documentSwagger = () => SwaggerModule.createDocument(app, configSwagger)

  const optionsOpenApi = {
    swaggerOptions: {
      responseInterceptor: (res) => {
        return res;
      },
      defaultModelsExpandDepth: -1,
      docExpansion: 'none',
      persistAuthorization: true,
    },
  };

  SwaggerModule.setup('docs', app, documentSwagger, optionsOpenApi)

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
