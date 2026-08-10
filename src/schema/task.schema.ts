import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose from "mongoose";

@Schema({timestamps:true , toObject:{virtuals:true} , toJSON:{virtuals:true}})
export class Task {
      @Prop({type:String , required:true , minLength:2})
      title!:string;
      @Prop()
      description?:string;
      @Prop({type:mongoose.Types.ObjectId , ref:'User'})
      userId!:User;
      @Prop({type:Boolean , default:false})
      complete?:boolean
}

export const taskSchema = SchemaFactory.createForClass(Task)