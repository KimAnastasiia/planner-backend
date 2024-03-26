/* eslint-disable prettier/prettier */
// database/user.entity.ts
import { dates } from 'src/date/typeorm/Date.entity';
import { invited } from 'src/invited/typeorm/Invited.entity';
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
  
  @OneToMany(() => invited, i => i.meeting, { cascade: true })
  invited:invited[];

  @Column()
  token:string;

  @Column()
  private:boolean;

  @Column()
  limitedSelection:boolean;

  @Column()
  amountOfLimitedSelection:number;
}


