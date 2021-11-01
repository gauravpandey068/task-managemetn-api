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
import { TodoStatus } from './utils/todo-status.enum';
@Controller(':taskId/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<any> {
    return this.todoService.create(taskId, createTodoDto);
  }

  @Get()
  findAll(@Param('taskId', ParseIntPipe) taskId: number): Promise<Todo[]> {
    return this.todoService.findAll(taskId);
  }

  //update title and description
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<any> {
    return this.todoService.update(id, taskId, updateTodoDto);
  }

  //update status only
  @Patch('status/:id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
  ): Promise<any> {
    return this.todoService.updateStatus(id, taskId, status);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ): Promise<any> {
    return this.todoService.remove(id, taskId);
  }
}
