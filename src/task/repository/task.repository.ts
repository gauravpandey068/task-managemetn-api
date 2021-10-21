import { EntityRepository, Repository } from 'typeorm';
import { FilterDto } from '../dto/filter.dto';
import { TaskDto } from '../dto/task.dto';
import { Task } from '../entities/task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  //create task

  async createTask(createTaskDto: TaskDto): Promise<any> {
    const { taskName, description } = createTaskDto;

    const task = new Task();
    task.taskName = taskName;
    task.description = description;

    await this.manager.save(task);

    return { message: 'Task Created!', task };
  }

  //get task
  //
  async getAllTasks(filterDto: FilterDto): Promise<Task[]> {
    const { keyword } = filterDto;

    const query = this.createQueryBuilder('task');

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
