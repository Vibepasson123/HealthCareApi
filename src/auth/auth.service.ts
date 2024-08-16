// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { LoginResponseDto } from 'src/users/dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.usersService.register(registerUserDto);
    return this.generateJwt(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    const user = await this.usersService.validateUser(loginUserDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateJwt(user);
    const { _id, name, email } = user;

    return {
      access_token: token,
      user: {
        id: _id.toString(),
        name,
        email,
      },
    };
  }

  private generateJwt(user: any): string {
    const payload = { username: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }
}
