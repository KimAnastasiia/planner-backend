/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
// database/database.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { users } from '../typeorm/Users.entity';
import { VerificateUserDto } from 'src/dtos/verificateUser.dto';


@Injectable()// we can use enywhere like: this.databaseService.createUser(email, password)
export class UsersService {

  constructor(
    @InjectRepository(users)
    private userRepository: Repository<users>,
  ) {}
/*
  async getUsers(): Promise<users[]> {
    try {
      //find() return list like get
      return await this.userRepository.find();
    } catch (err) {
      console.log(err);
    }
  }
  */
  async getUser(email:string): Promise<users[] | undefined> {
    try {
      return await this.userRepository.find({ where: { email } });
    } catch (err) {
      console.log(err);
    }
  }
  async postUser(userDetails:CreateUserDto): Promise<users> {
    try {
      //find() return list like get
      const newUser  = await this.userRepository.create(userDetails);
      return await this.userRepository.save(newUser);
    } catch (err) {
      console.log(err);
    }
  }
  async postVarificateUser(userDetails:VerificateUserDto): Promise<users[]> {
    try {
      //find() return list like get
      return await this.userRepository.find({
        where: {
          email: userDetails.email,
          password: userDetails.password,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
