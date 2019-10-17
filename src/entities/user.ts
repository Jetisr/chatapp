/* eslint-disable import/no-cycle */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Message from "./message";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Message, message => message.user)
  messages: Message[];

  @Column()
  passwordHash: string;
}

export default User;
