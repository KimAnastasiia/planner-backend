/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty } from "class-validator";

export class VerificateUserDto{

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    @IsEmail()
    email:string
}