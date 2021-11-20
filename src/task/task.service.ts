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
import { Auth } from 'src/auth/entities/auth.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  //create task
  async create(createTaskDto: TaskDto, user: Auth): Promise<any> {
    try {
      return this.taskRepository.createTask(createTaskDto, user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //find all task
  async findAll(filterDto: FilterDto, user: Auth): Promise<Task[]> {
    try {
      return this.taskRepository.getAllTasks(filterDto, user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //find task by id
  async findOne(id: number, user: Auth): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task ${id} not found in database.`);
    } else {
      return found;
    }
  }

  //update task by id
  async update(id: number, updateTaskDto: TaskDto, user: Auth): Promise<any> {
    const task = await this.findOne(id, user);
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

  //delete task by id
  async remove(id: number, user: Auth): Promise<any> {
    const findTask = await this.findOne(id, user);

    if (findTask) {
      const result = await this.taskRepository.delete(id);
      if (!result.affected) {
        throw new NotFoundException(
          `Cannot Delete Task of ${findTask.taskName}. Try again later.`,
        );
      } else {
        return { respond: `Task ${findTask.taskName} is Deleted.` };
      }
    } else {
      throw new NotFoundException(`Task of ${id} not found`);
    }
  }
}
