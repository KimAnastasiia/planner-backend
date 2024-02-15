/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
import { dates } from "src/date/typeorm/Date.entity";

export class createMeetingDto{
    
    id: bigint

    userEmail: string;
    
    @IsNotEmpty()
    title:string;
  
    descriptions:string;

    location:string;
    
    @IsNotEmpty()
    onlineConference:string;
    
    dates:dates[]

    token:string
    
    private:boolean

    invited: {email:string}[]
}

