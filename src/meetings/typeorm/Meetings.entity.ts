/* eslint-disable prettier/prettier */
// database/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class meetings {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  date: string;
  
  @Column()
  userEmail: string;
  
  @Column()
  title:string;

  @Column()
  descriptions:string;

  @Column()
  location:string;

  @Column()
  time:string;

}
