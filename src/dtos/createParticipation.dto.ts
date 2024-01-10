/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty } from "class-validator";
import { times } from "src/times/typeorm/Time.entity";

export class createParticipationDto {

    @IsNotEmpty()
    @IsEmail()
    userEmail: string;

    @IsNotEmpty()
    name: string;

    time:times;

    meetingId:bigint;

    @IsNotEmpty()
    timesIds:times[]

}

