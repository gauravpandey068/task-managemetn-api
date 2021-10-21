import { IsNotEmpty, IsString } from 'class-validator';

export class TaskDto {
  //implement validation
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
