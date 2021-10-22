import { IsNotEmpty, IsString } from 'class-validator';
import { TodoStatus } from '../utils/todo-status.enum';

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsString()
  todoName: string;

  @IsString()
  todoDescription: string;

  @IsNotEmpty()
  status: TodoStatus;
}
