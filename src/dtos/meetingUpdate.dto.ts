/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";

export class MeetingUpdateDto{

    id:bigint

    userEmail: string;
    
    @IsNotEmpty()
    title:string;
  
    descriptions:string;

    location:string;
    
    @IsNotEmpty()
    onlineConference:string;

    dates:[]
}

