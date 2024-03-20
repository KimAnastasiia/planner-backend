/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
import { dates } from "src/date/typeorm/Date.entity";
import { invited } from "src/invited/typeorm/Invited.entity";

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

    invited: invited[];

    oneToOne:boolean;
}

