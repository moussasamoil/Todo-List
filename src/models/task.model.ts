import { MongooseModule } from "@nestjs/mongoose";
import { Task, taskSchema } from "../schema/task.schema";


export const taskModel = MongooseModule.forFeature([{name:Task.name,schema:taskSchema}])