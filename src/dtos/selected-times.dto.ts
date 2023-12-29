/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";

export class SelectedTimes{
  
    @IsNotEmpty()
    meetingId: bigint;

    @IsNotEmpty()
    timeId: bigint;
    
    @IsNotEmpty()
    dateId: bigint;
}

