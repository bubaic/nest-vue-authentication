import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @Column({ nullable: true, name: "first_name" })
  firstName: string;

  @Column({ nullable: true, name: "last_name" })
  lastName: string;

  @Column({ unique: true, name: "email" })
  email: string;

  @Column({ name: "password" })
  @Exclude()
  password: string;

  @Column({ default: true, name: "is_active" })
  isActive: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
