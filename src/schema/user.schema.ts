import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Roles } from "../types/enum";


@Schema({ timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } })
export class User {

    @Prop({ type: String, required: true, length: [3, 20] })
    first_name!: string;
    @Prop({ type: String, required: true, length: [3, 20] })
    last_name!: string;

    @Prop({ type: String, required: true, index: true, unique: true })
    email!: string;

    @Prop({ type: String, required: true, length: [6, 20] })
    password!: string;

    @Prop({ type: Number, required: true, max: 99, min: 18 })
    age!: number
    @Prop({ type: String, default: Roles.USER  })
    role!: Roles

}

 export const userSchema = SchemaFactory.createForClass(User);