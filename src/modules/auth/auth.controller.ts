import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller('auth')

export class AuthController{
    constructor(private readonly _AuthService:AuthService){}

    @Post('signUp')
    signUp(@Body() data:AuthDto){
        return this._AuthService.signUp(data);
    }
}