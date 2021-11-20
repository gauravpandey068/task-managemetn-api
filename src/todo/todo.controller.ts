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
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoStatusValidationPipe } from './pipes/todo-status-validation.pipi';
import { UpdateTodoDto } from './dto/update-todo.dts';
import { TodoStatus } from './utils/todo-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/jwt/get-user.decorator';
import { Auth } from 'src/auth/entities/auth.entity';
@Controller(':taskId/todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: Auth,
  ): Promise<any> {
    return this.todoService.create(taskId, createTodoDto, user);
  }

  @Get()
  findAll(
    @Param('taskId', ParseIntPipe) taskId: number,
    @GetUser() user: Auth,
  ): Promise<Todo[]> {
    return this.todoService.findAll(taskId, user);
  }

  //update title and description
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @GetUser() user: Auth,
  ): Promise<any> {
    return this.todoService.update(id, taskId, updateTodoDto, user);
  }

  //update status only
  @Patch('status/:id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @GetUser() user: Auth,
  ): Promise<any> {
    return this.todoService.updateStatus(id, taskId, status, user);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @GetUser() user: Auth,
  ): Promise<any> {
    return this.todoService.remove(id, taskId, user);
  }
}
