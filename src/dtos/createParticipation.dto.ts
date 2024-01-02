/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty } from "class-validator";

export class createParticipationDto {

    @IsNotEmpty()
    @IsEmail()
    userEmail: string;

    @IsNotEmpty()
    name: string;

    time:bigint
    
    @IsNotEmpty()
    timesIds:bigint[]

}

