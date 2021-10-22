import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoStatusValidationPipe } from './pipes/todo-status-validation.pipi';
import { UpdateTodoDto } from './dto/update-todo.dts';
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTodoDto: CreateTodoDto): Promise<any> {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body('status', TodoStatusValidationPipe) updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.todoService.remove(id);
  }
}
