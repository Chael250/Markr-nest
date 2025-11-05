import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUser } from '../dtos/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService) {}

    @Post('create')
    async createUser(@Body() createUser:CreateUser) {
        return this.userService.create(createUser)
    }
}
