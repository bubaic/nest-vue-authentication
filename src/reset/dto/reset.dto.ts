import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsNotEmpty } from "class-validator";

export class ResetDTO {
  @ApiProperty({ description: "new password to reset" })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: "confirm new password" })
  @IsNotEmpty()
  passwordConfirm: string;

  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjQ3NTQ4Njk4fQ.1QuNHLvruMF8dv73DwOMx44rlmQw_IjrX2E3_sX2LP8",
  })
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
