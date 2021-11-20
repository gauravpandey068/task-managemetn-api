import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { TaskService } from 'src/task/task.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dts';
import { Todo } from './entities/todo.entity';
import { TodoRepository } from './repository/todo.repository';
import { TodoStatus } from './utils/todo-status.enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
    private taskService: TaskService, //import taskService,
  ) {}

  async create(
    taskId: number,
    createTodoDto: CreateTodoDto,
    user: Auth,
  ): Promise<any> {
    //check task is exist
    const result = await this.taskService.findOne(taskId, user);

    if (result) {
      try {
        return await this.todoRepository.createTodo(taskId, createTodoDto);
      } catch (error) {
        throw new InternalServerErrorException(
          'Cannot add todo. please try again later.',
        );
      }
    }
  }

  async findAll(taskId: number, user: Auth): Promise<Todo[]> {
    const result = await this.taskService.findOne(taskId, user);
    if (result) {
      const found = await this.todoRepository.find({
        where: { taskId: taskId },
      });
      if (found) {
        return found;
      } else {
        throw new BadRequestException();
      }
    } else {
      throw new NotFoundException('Task Not Found');
    }
  }

  async findOne(id: number, taskId: number, user: Auth) {
    const found = await this.taskService.findOne(taskId, user);

    if (found) {
      try {
        const result = await this.todoRepository.findOne({
          where: { id, taskId: taskId },
        });
        if (result) {
          return result;
        } else {
          throw new NotFoundException('Result Not Found!');
        }
      } catch (error) {
        throw new NotFoundException('Result Not Found!');
      }
    }
  }

  //update title and description
  async update(
    id: number,
    taskId: number,
    updateTodoDto: UpdateTodoDto,
    user: Auth,
  ): Promise<any> {
    const itemFound = await this.findOne(id, taskId, user);

    const { todoName, todoDescription } = updateTodoDto;

    itemFound.todoName = todoName;
    itemFound.todoDescription = todoDescription;

    try {
      await this.todoRepository.manager.save(itemFound);

      return { message: `${itemFound.todoName} updated.`, itemFound };
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot Update. Try aganin later.',
      );
    }
  }

  async remove(id: number, taskId: number, user: Auth): Promise<any> {
    const found = await this.findOne(id, taskId, user);

    if (!found) {
      throw new NotFoundException(`ToDo Items of id ${id} not found`);
    } else {
      const result = await this.todoRepository.delete(id);
      if (!result.affected) {
        throw new NotFoundException(`Cannot Delete`);
      } else {
        return { message: `${found.todoName} deleted` };
      }
    }
  }

  //update todo status
  async updateStatus(
    id: number,
    taskId: number,
    status: TodoStatus,
    user: Auth,
  ): Promise<any> {
    const todo = await this.findOne(id, taskId, user);

    todo.status = status;
    await this.todoRepository.manager.save(todo);
    return { message: `${todo.todoName}'s status updated.'`, todo };
  }
}
