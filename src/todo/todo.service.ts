import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<any> {
    try {
      return this.todoRepository.createTodo(createTodoDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot add todo. please try again later.',
      );
    }
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: number) {
    const result = await this.todoRepository.findOne(id);

    if (result) {
      return result;
    } else {
      throw new NotFoundException('Result Not Found!');
    }
  }

  //update title and description
  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<any> {
    const itemFound = await this.findOne(id);

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

  async remove(id: number): Promise<any> {
    const found = await this.todoRepository.findOne(id);

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
  async updateStatus(id: number, status: TodoStatus): Promise<any> {
    const todo = await this.findOne(id);

    todo.status = status;
    await this.todoRepository.manager.save(todo);
    return { message: `${todo.todoName}'s status updated.'`, todo };
  }
}
