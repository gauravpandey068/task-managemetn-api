import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from './dto/filter.dto';
import { TaskDto } from './dto/task.dto';
import { TaskRepository } from './repository/task.repository';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  //create task
  async create(createTaskDto: TaskDto): Promise<any> {
    try {
      return this.taskRepository.createTask(createTaskDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //find all task
  async findAll(filterDto: FilterDto): Promise<Task[]> {
    try {
      return this.taskRepository.getAllTasks(filterDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //find task by id
  async findOne(id: number): Promise<Task> {
    const taskById = await this.taskRepository.findOne(id);

    if (!taskById) {
      throw new NotFoundException(`Task ${id} not found in database.`);
    } else {
      return taskById;
    }
  }

  //update task
  async update(id: number, updateTaskDto: TaskDto): Promise<any> {
    const task = await this.findOne(id);
    const oldTaskName = task.taskName;
    const { taskName, description } = updateTaskDto;

    task.taskName = taskName;
    task.description = description;

    try {
      await this.taskRepository.manager.save(task);
    } catch (error) {
      throw new InternalServerErrorException(
        `Cannot update ${oldTaskName}. Please Try again later.`,
      );
    }

    return { message: `Task ${oldTaskName} is updated`, task };
  }

  //delete task
  async remove(id: number): Promise<string> {
    const findTask = await this.findOne(id);

    if (findTask) {
      const result = await this.taskRepository.delete(id);
      if (!result.affected) {
        throw new NotFoundException(
          `Cannot Delete Task of ${findTask.taskName}. Try again later.`,
        );
      } else {
        return `Task ${findTask.taskName} is Deleted.`;
      }
    } else {
      throw new NotFoundException(`Task of ${id} not found`);
    }
  }
}
