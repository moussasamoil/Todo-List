import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "../schema/user.schema";


export const userModel = MongooseModule.forFeature([{name:User.name , schema:userSchema}])