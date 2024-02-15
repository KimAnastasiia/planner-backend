/* eslint-disable prettier/prettier */
// database/user.entity.ts
import { meetings } from 'src/meetings/typeorm/Meetings.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class invited {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id:bigint;
  
  @Column()
  email: string;
  
  @ManyToOne(() => meetings, m => m.invited)
  meeting:meetings;
}


