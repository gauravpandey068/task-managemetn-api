import { EntityRepository, Repository } from 'typeorm';
import { TodoDto } from '../dto/todo.dto';
import { Todo } from '../entities/todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(createTodoDto: TodoDto): Promise<any> {
    const { todoName, todoDescription, progress } = createTodoDto;

    const todo = new Todo();

    todo.todoName = todoName;
    todo.todoDescription = todoDescription;
    todo.progress = progress;

    await this.manager.save(todo);

    return { message: `${todoName} Added!`, todo };
  }
}
