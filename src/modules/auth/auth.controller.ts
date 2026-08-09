import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dto/auth.dto";
import type { Response } from "express";

@Controller('auth')

export class AuthController {
    constructor(private readonly _AuthService: AuthService) { }

    @Post('signUp')
    async signUp(@Body() data: SignUpDto) {
        const info = await this._AuthService.signUp(data);
        return {id:info?._id , email:info?.email};
    }
    @Post('signIn')
    signIn(@Body() data: SignInDto) {
        return this._AuthService.signIn(data);
    }
}