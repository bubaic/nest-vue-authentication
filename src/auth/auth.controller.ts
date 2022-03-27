import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthInterceptor } from "./auth.interceptor";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { compare, hash } from "bcrypt";
import { Request, Response } from "express";

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtTokenSvc: JwtService
  ) {}

  @Post("sign-up")
  async register(@Body() payload: RegisterDTO) {
    if (payload.password != payload.passwordConfirm) {
      throw new BadRequestException("Passwords didn't match");
    }

    payload.password = await hash(payload.password, 12);
    return this.authService.create(payload);
  }

  @Post("sign-in")
  async login(
    @Body() payload: LoginDTO,
    @Res({ passthrough: true }) res: Response
  ) {
    const email = payload.email,
      user = await this.authService.fetchOne({ email }),
      token = await this.jwtTokenSvc.signAsync({ id: user.id });

    if (!user) {
      throw new BadRequestException("User doesn't exist");
    } else {
      const isValidPassword = await compare(payload.password, user.password);
      res.cookie("token", token, { httpOnly: true });

      if (isValidPassword) return { user };
    }
  }

  @Post("sign-out")
  @UseInterceptors(AuthInterceptor)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("token");
    return { message: "Success" };
  }

  @Get("user")
  @UseInterceptors(AuthInterceptor)
  async getUser(@Req() req: Request) {
    const token = req.cookies["token"],
      data: Object = await this.jwtTokenSvc.verifyAsync(token);

    return this.authService.fetchOne({ id: data["id"] });
  }

  @Get("users")
  async getAllUsers() {
    return this.authService.fetchAll();
  }
}
