import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ResetModule } from './reset/reset.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "data.db",
      synchronize: true,
      autoLoadEntities: true,
    }),
    ResetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
