import  bcrypt  from 'bcrypt';
import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "../schema/user.schema";


export const userModel = MongooseModule.forFeatureAsync([{name:User.name , useFactory:()=>{
    const schema = userSchema;
    schema.pre("save" , function(){
        if(this.isModified("password")){
            this.password = bcrypt.hashSync(this.password,10);
        }
    })
    return schema
}}])