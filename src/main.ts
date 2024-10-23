import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from 'src/config/config';
import * as cors from 'cors';
import { HttpExceptionFilter } from './shared/filters/http-exception.filters';
import { ResponseFormatInterceptor } from './pipes/response-format-interceptor.pipes';
import { ValidationPipe } from './pipes/validation.pipes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const config = configuration();
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.use(
    cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(config.app.port ?? 3000);
}
bootstrap();
