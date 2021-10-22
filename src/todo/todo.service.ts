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
    return await this.todoRepository.findOne(id);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const itemFound = await this.findOne(id);

    const { todoName, todoDescription, status } = updateTodoDto;

    itemFound.todoName = todoName;
    itemFound.todoDescription = todoDescription;
    itemFound.status = status;

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
}
