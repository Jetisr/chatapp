/* eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./user";

@Entity()
class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  messageText: string;

  @ManyToOne(() => User, user => user.messages)
  user: User;
}

export default Message;
