import { Exclude } from "class-transformer";
import { IsInt, IsLowercase, IsNotEmpty, IsString, IsStrongPassword, Length, Max, Min } from "class-validator";


export class userDto {
    @IsString()
    @IsLowercase()
    @IsNotEmpty()
    email!: string
    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    first_name!: string;
    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    last_name!: string;
    @IsInt()
    @Min(18)
    @Max(99)
    @IsNotEmpty()
    age!: number;
    @IsString()
    @Length(6, 20)
    @IsNotEmpty()
    @IsStrongPassword()
    password!: string

}