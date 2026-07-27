import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsInt, IsLowercase, IsNotEmpty, IsString, IsStrongPassword, Length, Max, Min } from "class-validator";


export class AuthDto {
    @IsString()
    @IsLowercase()
    @IsNotEmpty()
    @ApiProperty({ example: 'john@example.com' })
    email!: string
    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    @ApiProperty({ example: 'john' })
    first_name!: string;
    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    @ApiProperty({ example: 'matheo' })
    last_name!: string;
    @IsInt()
    @Min(18)
    @Max(99)
    @IsNotEmpty()
    @ApiProperty()
    age!: number;
    @IsString()
    @Length(6, 20)
    @IsNotEmpty()
    @IsStrongPassword()
    @ApiProperty({ example: 'ْْXx123?@. ..' })
    password!: string

}