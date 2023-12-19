/* eslint-disable prettier/prettier */
// database/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class users {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  email: string;

  @Column()
  password: string;
  
  @Column()
  name: string;
}
