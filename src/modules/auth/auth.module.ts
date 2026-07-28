import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { BcryptService } from "../../common/services/bcrypt.service";
import { UserRepo } from "../../repositories/user.repo";
import { userModel } from "../../models/user.model";
import { JwtEncryptService } from "../../common/services/jwt.service";
import { JwtService } from "@nestjs/jwt";


@Module({
    imports:[userModel ],
    providers:[AuthService , BcryptService , UserRepo , JwtEncryptService ,JwtService ],
    controllers:[AuthController]
})
export class AuthModule{}