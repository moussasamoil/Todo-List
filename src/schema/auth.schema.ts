import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { hashPass } from "../utils/hashing.service";


@Schema({ timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } })
export class Auth {

    @Prop({ type: String, required: true, length: [3, 20] })
    first_name!: string;
    @Prop({ type: String, required: true, length: [3, 20] })
    last_name!: string;

    @Prop({ type: String, required: true, index: true, unique: true })
    email!: String;

    @Prop({ type: String, required: true, length: [6, 20] })
    password!: string;

    @Prop({ type: Number, required: true, max: 99, min: 18 })
    age!: number

}

export const authSchema = SchemaFactory.createForClass(Auth);

authSchema.pre('save', function () {
    if (this.isModified('password')) {
        hashPass(this.password ,10)
    }
})