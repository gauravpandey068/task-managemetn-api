import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './repository/todo.repository';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository]), TaskModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
//
