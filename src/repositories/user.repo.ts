import { Injectable } from "@nestjs/common";
import { BaseRepo } from "./base.repo";
import { userDocument } from "../schema/types";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schema/user.schema";
import { Model } from "mongoose";


@Injectable()

export class UserRepo extends BaseRepo<userDocument> {
    constructor(@InjectModel(User.name) protected userModel: Model<userDocument>) {
       super(userModel)
    }
}