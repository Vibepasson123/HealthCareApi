import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { LoginResponseDto } from '../users/dto/login-response.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  const mockAuthService = {
    login: jest.fn(),
  };

  const mockUsersService = {
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('register', () => {
    it('should successfully register a user', async () => {
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

      mockUsersService.register.mockResolvedValue(mockUser);

      const result = await authController.register(registerUserDto);

      expect(result).toEqual(mockUser);
      expect(mockUsersService.register).toHaveBeenCalledWith(registerUserDto);
    });
  });

  describe('login', () => {
    it('should successfully log in and return a JWT and user details', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const mockLoginResponse: LoginResponseDto = {
        access_token: 'mockJwtToken',
        user: {
          id: 'userId',
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      };

      mockAuthService.login.mockResolvedValue(mockLoginResponse);

      const result = await authController.login(loginUserDto);

      expect(result).toEqual(mockLoginResponse);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginUserDto);
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'john.doe@example.com',
        password: 'password123',
      };

      mockAuthService.login.mockResolvedValue(null);

      await expect(authController.login(loginUserDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
