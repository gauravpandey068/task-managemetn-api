import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus } from '../utils/todo-status.enum';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  todoName: string;

  @Column()
  todoDescription: string;

  @Column()
  status: TodoStatus;

  //many to one relations
}
