import { Injectable } from "@nestjs/common";
import { BaseRepo } from "./base.repo";
import { authDocument } from "../schema/types";
import { InjectModel } from "@nestjs/mongoose";
import { Auth } from "../schema/auth.schema";
import { Model } from "mongoose";

@Injectable()
export class AuthRepo extends BaseRepo<authDocument>{
    constructor(@InjectModel(Auth.name) protected authModel:Model<authDocument>){
        super(authModel)
    }
}