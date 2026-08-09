import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Todo List')
    .setDescription('this is clarifying the end point of Todo list')
    .setVersion('1.0.0')
    .addBearerAuth({
      type:"http",
      scheme:"bearer",
      bearerFormat:"JWT",
      name:"Authorization",
      description:"Enter JWT Token",
      in:'header'
    }, 'access-token')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, documentFactory);
  // const url = `http://localhost:${process.env.PORT||3000}/api-docs`;
  // const startCommand = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  // exec(`${startCommand} ${url}`, (error) => {
  //   if (error) {
  //     console.log('Could not open browser automatically:', error);
  //   }
  // });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port ?? 3000 , ()=>{
    console.log(`app run on port ${port}`)
  });

}
bootstrap();
