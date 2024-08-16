export class LoginResponseDto {
  readonly access_token: string;
  readonly user: {
    id: string;
    name: string;
    email: string;
  };
}
