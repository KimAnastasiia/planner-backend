/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe, HttpStatus, HttpException  } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { objectOfApiKey } from 'src/utils/objectApiKey';
import { Request } from 'express';
import { VerificateUserDto } from 'src/dtos/verificateUser.dto';
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const keyEncrypt = 'password';
const algorithm = 'aes256'
@Controller('users')

export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getUser( @Req() request: Request) {
    const email = request["userEmail"]
    try {
      const userFounded = await this.usersService.getUser(email);
      if(userFounded.length==0){
        const user = await this.usersService.postUser({
          email: email,
          name: '',
          password: ''
        });
        if (user.email) {
          return ([
            {
              name: user.name,
              email: user.email
            }])
  
        }
      }else{
        return userFounded;
      }
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        error: 'Failed to get user.',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())

  async createUser(@Body() userData: CreateUserDto) {

    console.log(userData)
    const cipher = crypto.createCipher(algorithm, keyEncrypt);
    const passwordEncript = cipher.update(userData.password, 'utf8', 'hex') + cipher.final('hex');
    userData.password = passwordEncript
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
      throw new HttpException({
        success: false,
        error: 'Failed to create user.',
      }, HttpStatus.BAD_REQUEST);
    }
  }
  @Post("/verification")
  @UsePipes(new ValidationPipe())

  async verificateUser(@Body() userData: VerificateUserDto) {

    console.log(userData)
    const cipher = crypto.createCipher(algorithm, keyEncrypt);
    const passwordEncript = cipher.update(userData.password, 'utf8', 'hex') + cipher.final('hex');
    userData.password = passwordEncript
    try {
      const user = await this.usersService.postVerificateUser(userData);
      if (user.length > 0) {

        const apiKey = jwt.sign(
          {
            name: user[0].name,
            email: user[0].email

          },
          "secret");

        objectOfApiKey.push(apiKey)
        return (
          {
            apiKey: apiKey,
            name: user[0].name,
            email: user[0].email
          })

      }else{
        throw new Error('Failed to verificate user.');
      }
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        error: 'Failed to verificate user.',
      }, HttpStatus.BAD_REQUEST);
    
    }
  }
}
