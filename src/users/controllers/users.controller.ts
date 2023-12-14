/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';

@Controller('users')

export class UsersController {

  constructor(private readonly usersService: UsersService) { }

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

  @Post()
  @UsePipes(new ValidationPipe())

  async createUser(@Body() userData: CreateUserDto) {

    console.log(userData)


    try {
      const user = await this.usersService.postUser(userData); 
      return user.id;
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: 'Failed to create user.',
      }; // Handle errors appropriately
    }
  }
}
