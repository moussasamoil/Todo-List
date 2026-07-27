import { MongooseModule } from "@nestjs/mongoose";
import { Auth, authSchema } from "../schema/auth.schema";


export const authModel = MongooseModule.forFeature([{name : Auth.name , schema:authSchema}])