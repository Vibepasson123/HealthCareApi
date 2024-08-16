import { IsString, IsEmail } from 'class-validator';

export class UserDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;
}
