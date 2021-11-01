import { Todo } from 'src/todo/entities/todo.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['taskName'])
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @Column()
  description: string;

  @OneToMany(() => Todo, (todo) => todo.task, { eager: true })
  todo: Todo[];
}
