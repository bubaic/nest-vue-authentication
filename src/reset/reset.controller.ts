import {
  Body,
  Controller,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Patch,
  Post,
} from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ResetService } from "./reset.service";
import { ResetDTO } from "./dto/reset.dto";
import { AuthService } from "../auth/auth.service";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

@Controller()
export class ResetController {
  constructor(
    private resetSvc: ResetService,
    private mailSvc: MailerService,
    @Inject(forwardRef(() => AuthService)) private authSvc: AuthService
  ) {}

  @Post("forget-password")
  async forgotPassword(@Body("email") email: string) {
    const user = this.authSvc.fetchOne({ email }),
      passToken = sign({ user }, "token-private", { algorithm: "HS256" }),
      url = `http://localhost:3030/reset/${passToken}`;

    await this.resetSvc.create({ email, token: passToken });
    await this.mailSvc.sendMail({
      to: email,
      subject: "Password reset",
      html: `
				<h1>Reset Password</h1>
				Click <a href='${url}'>here</a> to reset your password!
			`,
    });

    return { message: "Success" };
  }

  @Patch("reset-password")
  async resetPassword(@Body() payload: ResetDTO) {
    if (payload.password != payload.passwordConfirm) {
      throw new HttpException("Passwords don't match!", HttpStatus.BAD_REQUEST);
    }

    const reset = await this.resetSvc.fetchOne({ token: payload.token }),
      user = await this.authSvc.fetchOne({ email: reset.email });

    if (!user) throw new HttpException("User not found!", HttpStatus.NOT_FOUND);

    const hashedPass = await hash(payload.password, 10);
    this.authSvc.update(user.id, { password: hashedPass });
  }
}
