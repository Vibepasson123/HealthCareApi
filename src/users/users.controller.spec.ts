import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ConflictException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  // Create a mock UsersService with manual implementations
  const mockUsersService = {
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('register', () => {
    it('should successfully register a user', async () => {
      const registerUserDto: RegisterUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'plainPassword',
      };

      // Define the result to be returned
      const result = {
        name: 'John Doe',
        email: 'john.doe@example.com',
      };

      // Set up the mock to return the result
      mockUsersService.register.mockResolvedValue(result);

      // Call the controller method and check the result
      const response = await controller.register(registerUserDto);
      expect(response).toEqual(result);
      expect(mockUsersService.register).toHaveBeenCalledWith(registerUserDto);
    });

    it('should throw a ConflictException if the user already exists', async () => {
      const registerUserDto: RegisterUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'plainPassword',
      };

      // Set up the mock to throw an exception
      mockUsersService.register.mockRejectedValue(new ConflictException('User already exists'));

      // Call the controller method and check if it throws the expected exception
      await expect(controller.register(registerUserDto)).rejects.toThrow(ConflictException);
      expect(mockUsersService.register).toHaveBeenCalledWith(registerUserDto);
    });
  });
});
