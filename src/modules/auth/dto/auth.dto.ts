import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsLowercase, IsNotEmpty, IsString, IsStrongPassword, isUppercase, Length, Max, Min } from "class-validator";
import { Roles } from "../../../types/enum";
import { Transform } from "class-transformer";


export class SignUpDto {
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
    @IsEnum(Roles)
    @Transform(({value})=>value?.toUpperCase())
    @ApiProperty()
    role: Roles = Roles.USER;

}

export class SignInDto {
    @IsString()
    @IsLowercase()
    @IsNotEmpty()
    @ApiProperty({})
    email!: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({})
    password!: string
}