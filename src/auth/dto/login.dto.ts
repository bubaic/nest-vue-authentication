import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDTO {
  @IsEmail()
  @ApiProperty({
    example: "someemail@gmail.com",
    description: "enter your email",
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: "enter your password",
  })
  password: string;
}
