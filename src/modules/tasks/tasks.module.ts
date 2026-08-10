import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { taskModel } from '../../models/task.model';
import { TaskRepo } from '../../repositories/task.repo';

@Module({
  imports:[taskModel],
  controllers: [TasksController],
  providers: [TasksService , TaskRepo],
})
export class TasksModule {}
