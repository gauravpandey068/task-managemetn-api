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
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';
import { FilterDto } from './dto/filter.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/jwt/get-user.decorator';
import { Auth } from 'src/auth/entities/auth.entity';
@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  //crud operations
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTaskDto: TaskDto, @GetUser() user: Auth): Promise<any> {
    return this.taskService.create(createTaskDto, user);
  }

  @Get()
  findAll(
    @Query(ValidationPipe) filterDto: FilterDto,
    @GetUser() user: Auth,
  ): Promise<Task[]> {
    return this.taskService.findAll(filterDto, user);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: Auth,
  ): Promise<Task> {
    return this.taskService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: TaskDto,
    @GetUser() user: Auth,
  ): Promise<any> {
    return this.taskService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: Auth,
  ): Promise<any> {
    return this.taskService.remove(id, user);
  }
}
