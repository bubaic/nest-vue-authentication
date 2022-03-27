import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("forget_password")
export class ResetEntity {
  @PrimaryGeneratedColumn("increment") id: number;
  @Column() email: string;
  @Column() token: string;
}
