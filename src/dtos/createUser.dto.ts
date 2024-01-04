/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto{

    name:string;


    password:string;

    @IsNotEmpty()
    @IsEmail()
    email:string
}