import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsString()
  todoName: string;

  @IsString()
  todoDescription: string;
}
