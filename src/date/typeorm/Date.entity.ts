/* eslint-disable prettier/prettier */
// database/user.entity.ts
import { meetings } from 'src/meetings/typeorm/Meetings.entity';
import { times } from 'src/times/typeorm/Time.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';


@Entity()
export class dates {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id:bigint;
  
  @ManyToOne(() => meetings, m => m.dates)
  meeting:meetings;

  @Column()
  date:string;

  @OneToMany(() => times, d => d.date, { cascade: true })
  times:times[];

}
