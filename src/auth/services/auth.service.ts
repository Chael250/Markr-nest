// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from 'src/users/service/user.service';
// import * as bcrypt from 'bcryptjs'

// @Injectable()
// export class AuthService {
//     constructor(private readonly userService:UserService, private readonly jwtService:JwtService) {}

//     async validateUser(email:string, password: string) {
//         const user = await this.userService.findByEmail(email);
//         if (!user) return null;

//         const valid = await bcrypt.compare(password, user.password);
//         if (!valid) return null;
        
//         const {password:_, ...safeUser} = user;
//         return safeUser
//     }

//     // async register(email: string, password: string, role = 'user') {
//     //     const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
//     //     const hash = await bcrypt.hash(password, saltRounds);
//     //     const newUser = await this.userService.create({ email, password: hash, role });
//     //     const { password: _, ...safeUser } = newUser;
//     //     return safeUser;
//     // }
// }
