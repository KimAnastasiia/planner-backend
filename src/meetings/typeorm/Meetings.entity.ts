/* eslint-disable prettier/prettier */
// database/user.entity.ts
import { dates } from 'src/date/typeorm/Date.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity()
export class meetings {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id:bigint;
  
  @Column()
  userEmail: string;
  
  @Column()
  title:string;

  @Column()
  descriptions:string;

  @Column()
  location:string;
  
  @Column()
  onlineConference:string;
  
  @OneToMany(() => dates, d => d.meeting, { cascade: true })
  dates:dates[];
}


