import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

(async function () {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1/");
  app.useGlobalPipes(new ValidationPipe({}));
  app.use(cookieParser());

  const appOptions = new DocumentBuilder()
    .setTitle("NestAuth")
    .setDescription("Basic authentication system using NestJS")
    .setVersion("v0.1")
    .build();
  const document = SwaggerModule.createDocument(app, appOptions);
  
  SwaggerModule.setup("/api/v1", app, document);
  await app.listen(3030);
})();
