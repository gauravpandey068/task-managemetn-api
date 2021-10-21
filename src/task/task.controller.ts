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
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';
import { FilterDto } from './dto/filter.dto';
import { Task } from './entities/task.entity';
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  //crud

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTaskDto: TaskDto): Promise<any> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Query(ValidationPipe) filterDto: FilterDto): Promise<Task[]> {
    return this.taskService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: TaskDto,
  ): Promise<any> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.taskService.remove(id);
  }
}
