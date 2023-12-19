/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";

export class createMeetingDto{
  

    @IsNotEmpty()
    date: string;

    @IsNotEmpty()
    videoConference: string;
    
    @IsNotEmpty()
    userId: number;
    
    @IsNotEmpty()
    title:string;
  
    descriptions:string;

    location:string;
  
    @IsNotEmpty()
    time:string;

}

