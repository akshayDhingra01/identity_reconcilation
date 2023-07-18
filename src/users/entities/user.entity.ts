import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("contact")
export class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  phoneNumber?: Number

  @Column()
  email?: string

  @Column({default : 'primary'})  // why not taking primary or secondary both at a time
  // linkPrecedence : "primary"|"secondary" // "primary" if it's the first Contact in the link
  linkPrecedence : string // "primary" if it's the first Contact in the link

  @Column({default : null})
  linkedId?: Number // the ID of another Contact linked to this one?

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({default : null})
  deletedAt?: Date;

}
