/* eslint-disable prettier/prettier */
// database/user.entity.ts
import { Entity, Column, PrimaryColumn } from 'typeorm';


@Entity()
export class users {

  @PrimaryColumn()
  email: string;

  @Column()
  password: string;
  
  @Column()
  name: string;
}
