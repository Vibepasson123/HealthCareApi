import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { LoginResponseDto } from '../users/dto/login-response.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    register: jest.fn(),
    validateUser: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('register', () => {
    it('should successfully register a user and return a JWT', async () => {
      const registerUserDto: RegisterUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };
      
      const mockUser = {
        _id: 'userId',
        name: 'John Doe',
        email: 'john.doe@example.com',
      };

      const mockToken = 'mockJwtToken';
      
      mockUsersService.register.mockResolvedValue(mockUser);
      jwtService.sign = jest.fn().mockReturnValue(mockToken);

      const result = await authService.register(registerUserDto);
      
      expect(result).toBe(mockToken);
      expect(mockUsersService.register).toHaveBeenCalledWith(registerUserDto);
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: mockUser.email,
        sub: mockUser._id,
      });
    });
  });

  describe('login', () => {
    it('should successfully log in and return a JWT and user details', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const mockUser = {
        _id: 'userId',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashedPassword', // Assuming password is stored as hashed
      };

      const mockToken = 'mockJwtToken';
      
      mockUsersService.validateUser.mockResolvedValue(mockUser);
      jwtService.sign = jest.fn().mockReturnValue(mockToken);

      const result = await authService.login(loginUserDto);

      const expectedResponse: LoginResponseDto = {
        access_token: mockToken,
        user: {
          id: 'userId',
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      };

      expect(result).toEqual(expectedResponse);
      expect(mockUsersService.validateUser).toHaveBeenCalledWith(loginUserDto);
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: mockUser.email,
        sub: mockUser._id,
      });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'john.doe@example.com',
        password: 'password123',
      };

      mockUsersService.validateUser.mockResolvedValue(null);

      await expect(authService.login(loginUserDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
