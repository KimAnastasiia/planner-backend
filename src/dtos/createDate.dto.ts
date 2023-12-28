/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";

export class createDate{
  
    @IsNotEmpty()
    datesArray: { day: string, times: { time: string, timeId: number }[] }[];
    
    @IsNotEmpty()
    idMeeting: bigint;

}

