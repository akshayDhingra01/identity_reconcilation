import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Contact")
export class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  phoneNumber?: string

  @Column()
  email?: string

  @Column()
  linkPrecedence : "secondary"|"primary" // "primary" if it's the first Contact in the link

  @Column()
  linkedId?: Number // the ID of another Contact linked to this one?

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt?: Date;

}
