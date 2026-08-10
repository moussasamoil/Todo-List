import { HydratedDocument } from "mongoose"
import { User } from "./user.schema"
import { Task } from "./task.schema"

export type userDocument = HydratedDocument<User>

export type taskDocument = HydratedDocument<Task>