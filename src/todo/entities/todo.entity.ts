import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @ManyToOne(() => Task, (task) => task.todo, { eager: false })
  task: Task;

  @Column()
  taskId: number;
}
