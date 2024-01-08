/* eslint-disable prettier/prettier */
import { meetings } from 'src/meetings/typeorm/Meetings.entity';
import { times } from 'src/times/typeorm/Time.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class participations {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id:bigint;
  
  @Column()
  userEmail: string;

  @Column()
  name: string;

  @ManyToOne(() => meetings, m => m.id, { cascade: true })
  meeting:bigint;

  @ManyToOne(() => times, t => t.id, { cascade: true , onDelete: 'CASCADE' })
  time:bigint;
 
}


