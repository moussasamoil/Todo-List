import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateTask {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'task js' })
    title!: string;
    @IsString()
    description?: string;
    @IsString()
    userId!:string
    @IsBoolean()
    complete?:boolean
}