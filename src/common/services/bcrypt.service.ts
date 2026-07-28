import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
@Injectable()
export class BcryptService {

    hash(textPlain: string, salt: number) {
        return bcrypt.hashSync(textPlain, salt);
    }

    compare(textPlain: string, hashPass: string) {
        return bcrypt.compareSync(textPlain, hashPass);
    }

}