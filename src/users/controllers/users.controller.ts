/* eslint-disable prettier/prettier */
import { Controller, Get} from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')

export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(){

    try {
      const userList = await this.usersService.getUsers(); // Modify this to use your actual getUsers method
      return userList;
    } catch (error) {
      console.error(error);
      return {success: false,
        error: 'Failed to get users.',}; // Handle errors appropriately
    }
  }
}
