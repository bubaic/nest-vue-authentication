import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./models/user.entity";
import { User } from "./models/user.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  // CRUD operations
  async create(user: User): Promise<User> {
    /* creates new user */
    return await this.userRepo.save(user);
  }

  async fetchOne(clause?: Object): Promise<User> {
    /* finds one user */
    return await this.userRepo.findOne(clause);
  }

  async fetchAll(): Promise<User[]> {
    /* finds all user */
    return await this.userRepo.find();
  }

  async update(id: number, data?: Object): Promise<unknown> {
    return this.userRepo.update(id, data);
  }
}
