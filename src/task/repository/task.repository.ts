import { Auth } from 'src/auth/entities/auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { FilterDto } from '../dto/filter.dto';
import { TaskDto } from '../dto/task.dto';
import { Task } from '../entities/task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  //create task

  async createTask(createTaskDto: TaskDto, user: Auth): Promise<any> {
    const { taskName, description } = createTaskDto;

    const task = new Task();
    task.taskName = taskName;
    task.description = description;
    task.user = user;

    await this.manager.save(task);
    //delete user for variable
    delete task.user;

    return { message: 'Task Created!', task };
  }

  //get task
  async getAllTasks(filterDto: FilterDto, user: Auth): Promise<Task[]> {
    const { keyword } = filterDto;

    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (keyword) {
      query.where(
        '(task.taskName LIKE :keyword OR task.description LIKE :keyword)',
        { keyword: `%${keyword}` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
