import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './repository/todo.repository';
import { TaskModule } from 'src/task/task.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository]), TaskModule, AuthModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
//
