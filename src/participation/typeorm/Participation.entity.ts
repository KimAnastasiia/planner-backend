/* eslint-disable prettier/prettier */
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

  @Column()
  token: string;

  @Column({ type: 'bigint' })
  meetingId: bigint;

  @ManyToOne(() => times, t => t.participations, { cascade: true , onDelete: 'CASCADE' })
  time: times;
 
}


