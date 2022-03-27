import { hash } from "bcrypt";
import { IsEmail, IsNotEmpty } from "class-validator";
import { BeforeInsert } from "typeorm";

export class RegisterDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @BeforeInsert()
  async hashed() {
    this.password = await hash(this.password, 10);
  }
  password: string;

  @IsNotEmpty()
  passwordConfirm: string;
}
