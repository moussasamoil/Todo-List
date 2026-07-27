import { HydratedDocument } from "mongoose"
import { User } from "./user.schema"
import { Auth } from "./auth.schema"

export type userDocument = HydratedDocument<User>

export type authDocument = HydratedDocument<Auth>;