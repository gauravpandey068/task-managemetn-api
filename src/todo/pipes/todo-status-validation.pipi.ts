import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TodoStatus } from '../utils/todo-status.enum';

export class TodoStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TodoStatus.DONE,
    TodoStatus.IN_PROGRESS,
    TodoStatus.TODO,
  ];

  transform(value: any) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatus.indexOf(status);
    return index !== -1;
  }
}
