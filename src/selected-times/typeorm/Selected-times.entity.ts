/* eslint-disable prettier/prettier */
// database/user.entity.ts
import { dates } from 'src/date/typeorm/Date.entity';
import { meetings } from 'src/meetings/typeorm/Meetings.entity';
import { times } from 'src/times/typeorm/Time.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';


@Entity()
export class selectedTimes {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id:bigint;

  @ManyToOne(() => meetings, m => m.id)
  meeting:meetings;

  @ManyToOne(() => times, t => t.id)
  time:times;

  @ManyToOne(() => dates, d => d.id)
  date:dates;
}
