import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepo } from "../../repositories/user.repo";
import { userDocument } from "../../schema/types";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtEncryptService {
    constructor(private readonly _UserRepo: UserRepo, private readonly jwtService: JwtService, private config: ConfigService) { }

    async generateToken(user: userDocument) {
        const payload = {
            sub: user.id,
            email: user.email
        }
        const access_token = await this.jwtService.signAsync(payload, {
            secret: this.config.get<string>('JWT_ACCESS_TOKEN'),
            expiresIn: "1d"
        })
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: this.config.get<string>('JWT_REFRESH_TOKEN'),
            expiresIn: "7d"
        })
        return { access_token, refresh_token }
    }

    async refresh(refreshToken: string) {
        const payload = await this.jwtService.verifyAsync<{ sub: string }>(refreshToken, {
            secret: this.config.get<string>('JWT_REFRESH_TOKEN'),
        })
        const user = await this._UserRepo.findOne({ _id: payload.sub })
        if (!user) {
            throw new NotFoundException("user not found")
        }
        return this.generateToken(user)
    }

    async verifyToken(token: string) {
        const payload = await this.jwtService.verifyAsync<{ sub: string }>(token, {
            secret: this.config.get<string>('JWT_ACCESS_TOKEN'),
        })
        return payload;
    }

}