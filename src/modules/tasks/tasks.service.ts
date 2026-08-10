import { Injectable } from '@nestjs/common';
import { TaskRepo } from '../../repositories/task.repo';

@Injectable()
export class TasksService {
    constructor(private _taskRepo:TaskRepo){}

   async getAllTask(){
        await this._taskRepo.getAllDocument();
    }
}
