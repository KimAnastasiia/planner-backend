/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
// database/database.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from '../typeorm/User.entity';
import { Repository } from 'typeorm';


@Injectable()// we can use enywhere like: this.databaseService.createUser(email, password)
export class UsersService {

  constructor(
    @InjectRepository(users)
    private userRepository: Repository<users>,
  ) {}

  async getUsers(): Promise<users[]> {
    try {
      //find() return list like get
      return await this.userRepository.find();
    } catch (err) {
      console.log(err);
    }
  }
}
