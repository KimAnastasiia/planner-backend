/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
import { dates } from "src/date/typeorm/Date.entity";

export class createMeetingDto{
 
    userEmail: string;
    
    @IsNotEmpty()
    title:string;
  
    descriptions:string;

    location:string;
    
    @IsNotEmpty()
    onlineConference:string;
    
    datesArray:dates[]
}

