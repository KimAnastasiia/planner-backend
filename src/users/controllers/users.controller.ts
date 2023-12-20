/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import {objectOfApiKey} from'src/utils/objectApiKey';
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const keyEncrypt = 'password';
const algorithm = 'aes256'
@Controller('users')

export class UsersController {

  constructor(private readonly usersService: UsersService) { }
  /*
    @Get()
    async getUsers() {
  
      try {
        const userList = await this.usersService.getUsers(); 
        return userList;
      } catch (error) {
        console.error(error);
        return {
          success: false,
          error: 'Failed to get users.',
        }; // Handle errors appropriately
      }
    }
  */
  @Get()
  async getUser(@Query('email') email: string) {

    try {
      const user = await this.usersService.getUser(email);
      return user;
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: 'Failed to get user.',
      }; // Handle errors appropriately
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())

  async createUser(@Body() userData: CreateUserDto) {

    console.log(userData)
    const cipher = crypto.createCipher(algorithm, keyEncrypt);
    const passwordEncript = cipher.update(userData.password, 'utf8', 'hex') + cipher.final('hex');
    userData.password=passwordEncript
    try {
      const user = await this.usersService.postUser(userData);
      if (user.email) {

        const apiKey = jwt.sign(
          {
            name: user.name,
            email: user.email

          },
          "secret");

        objectOfApiKey.push(apiKey)
        return (
          {
            apiKey: apiKey,
            name: user.name,
            email: user.email
          })

      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: 'Failed to create user.',
      }; // Handle errors appropriately
    }
  }
}
