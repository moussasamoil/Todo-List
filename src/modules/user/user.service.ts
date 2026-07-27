import { Injectable } from '@nestjs/common';
import { UserRepo } from '../../repositories/user.repo';

@Injectable()
export class UserService {
    constructor(private _UserRepo: UserRepo) { }

    getAllUsers() {
        return this._UserRepo.getAllDocument()
    }
  
}
