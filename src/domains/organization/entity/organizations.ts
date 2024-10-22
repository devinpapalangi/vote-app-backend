import { User } from 'src/domains/user/entity/users';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @OneToMany(() => User, (user) => user.organization)
  @JoinTable()
  users: User[];
}
