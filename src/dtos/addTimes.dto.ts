/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";

export class addTimesDto{
  

    @IsNotEmpty()
    time: string;
  
    @IsNotEmpty()
    idMeeting: bigint;

    @IsNotEmpty()
    idDate: bigint;
}

