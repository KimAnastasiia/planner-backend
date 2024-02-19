/* eslint-disable prettier/prettier */

import {IsNotEmpty } from "class-validator";
import { times } from "src/times/typeorm/Time.entity";

export class createPrivateParticipationDto {

    @IsNotEmpty()
    name: string;
    meetingToken?:string;
    time:times;
    userEmail:string;
    meetingId:bigint;
    userToken: string;
    token:string;
    timesIds:times[]

}

