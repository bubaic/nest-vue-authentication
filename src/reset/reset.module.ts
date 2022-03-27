import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { ResetEntity } from "./models/reset.entity";
import { ResetController } from "./reset.controller";
import { ResetService } from "./reset.service";

@Module({
  controllers: [ResetController],
  imports: [
    MailerModule.forRoot({
      transport: { host: "localhost", port: 1025 },
      defaults: { from: "no-reply@void.inc" },
    }),
    TypeOrmModule.forFeature([ResetEntity]),
    AuthModule,
  ],
  providers: [ResetService],
})
export class ResetModule {}
