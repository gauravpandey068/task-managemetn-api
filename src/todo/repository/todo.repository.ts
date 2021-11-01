import { EntityRepository, Repository } from 'typeorm';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { Todo } from '../entities/todo.entity';
import { TodoStatus } from '../utils/todo-status.enum';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(taskId: number, createTodoDto: CreateTodoDto): Promise<any> {
    const { todoName, todoDescription } = createTodoDto;

    const todo = new Todo();

    todo.todoName = todoName;
    todo.todoDescription = todoDescription;
    todo.status = TodoStatus.TODO; //default value
    todo.taskId = taskId;

    await this.manager.save(todo);

    return { message: `${todoName} Added!`, todo };
  }
}
