import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepo } from '../../repositories/user.repo';
import { userDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(private _UserRepo: UserRepo) { }

    getAllUsers() {
        return this._UserRepo.getAllDocument()
    }
    async signUp(data: userDto) {
        const checkExistUser = await this._UserRepo.findOne({ email: data.email });
        if (checkExistUser) {
            throw new ConflictException({
                message: "this email already exist", email: data.email
            })
        }
        return this._UserRepo.createDocument(data);
    }
}
