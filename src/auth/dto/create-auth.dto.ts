import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
