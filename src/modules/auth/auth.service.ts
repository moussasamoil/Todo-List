import { ConflictException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { AuthRepo } from "../../repositories/auth.repo";

@Injectable()
export class AuthService {
    constructor(private readonly _AuthRepo: AuthRepo) { }

    async signUp(data: AuthDto) {
        const checkExistUser = await this._AuthRepo.findOne({ email: data.email });
        if (checkExistUser) {
            throw new ConflictException({
                message: "this email already exist", email: data.email
            })
        }
        return this._AuthRepo.createDocument(data);
    }
}