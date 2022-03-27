import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserEntity } from "./models/user.entity";

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: "secpass",
      signOptions: { expiresIn: "300s", issuer: "void inc." },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
