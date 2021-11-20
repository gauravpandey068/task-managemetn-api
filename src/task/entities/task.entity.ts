import { Auth } from 'src/auth/entities/auth.entity';
import { Todo } from 'src/todo/entities/todo.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @Column()
  description: string;

  @ManyToOne(() => Auth, (auth) => auth.tasks, { eager: false })
  user: Auth;

  @Column()
  userId: number;

  @OneToMany(() => Todo, (todo) => todo.task, { eager: true })
  todo: Todo[];
}
