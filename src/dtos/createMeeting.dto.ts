/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";

export class createMeetingDto{
  

    @IsNotEmpty()
    date: string;
    
    userEmail: string;
    
    @IsNotEmpty()
    title:string;
  
    descriptions:string;

    location:string;
  
    @IsNotEmpty()
    time:string;

}

