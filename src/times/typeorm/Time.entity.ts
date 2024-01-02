/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// database/user.entity.ts
import { dates } from 'src/date/typeorm/Date.entity';
import { meetings } from 'src/meetings/typeorm/Meetings.entity';
import { participations } from 'src/participation/typeorm/Participation.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity()
export class times {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id:bigint;
  
  @Column()
  time: string;

  @ManyToOne(() => dates, m => m.id)
  date:bigint;

  @OneToMany(() => participations, p => p.time)
  participations:participations[];
}
