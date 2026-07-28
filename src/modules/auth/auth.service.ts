import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { SignInDto, SignUpDto } from "./dto/auth.dto";
import { BcryptService } from "../../common/services/bcrypt.service";
import { UserRepo } from "../../repositories/user.repo";
import { JwtEncryptService } from "../../common/services/jwt.service";

@Injectable()
export class AuthService {
    constructor(private readonly _UserRepo: UserRepo, private readonly _BcryptService: BcryptService , private readonly _JwtEncryptService:JwtEncryptService) { }

    async signUp(data: SignUpDto) {
        const checkExistUser = await this._UserRepo.findOne({ email: data.email });
        if (checkExistUser) {
            throw new ConflictException({
                message: "this email already exist", email: data.email
            })
        }
        return await this._UserRepo.createDocument(data);
    }

    async signIn(data: SignInDto):Promise<any> {
        const { email, password } = data;
        const checkExistUser = await this._UserRepo.findOne({ email });
        if (!checkExistUser) {
            throw new NotFoundException({ message: "this email did not exits try signUp first", email })
        }
        const compare = await this._BcryptService.compare(password, checkExistUser.password);
        console.log(compare);
        if (!compare) {
            throw new BadRequestException({ message: "this is wrong password try again" })
        }
        const tokens = await this._JwtEncryptService.generateToken(checkExistUser);
        return { message: "login successfully ", ...tokens }

    }
}