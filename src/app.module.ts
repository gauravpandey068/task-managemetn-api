import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TaskModule } from './task/task.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TaskModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
