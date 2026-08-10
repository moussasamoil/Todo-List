import { Injectable } from "@nestjs/common";
import { BaseRepo } from "./base.repo";
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schema/task.schema';
import { Model } from 'mongoose';
import { taskDocument } from "../schema/types";

@Injectable()

export class TaskRepo extends BaseRepo<taskDocument>{
    constructor (@InjectModel(Task.name) protected taskModel:Model<taskDocument> ){
        super(taskModel)
    }
}