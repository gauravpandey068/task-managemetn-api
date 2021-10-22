import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  todoName: string;

  @IsString()
  todoDescription: string;
}
