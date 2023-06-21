import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber?: string

  @Column()
  email?: string

  @Column()
  linkPrecedence : "secondary"|"primary" // "primary" if it's the first Contact in the link

  @Column()
  linkedId?: number // the ID of another Contact linked to this one?

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt?: Date;

  @Column({ default: true })
  isActive: boolean;
}
