import { IsOptional, IsString } from 'class-validator';
import { Permission } from '../user.model';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  login: string;

  @IsOptional()
  @IsString()
  passwordHash: string;

  @IsOptional()
  @IsString()
  role: Permission;

  @IsOptional()
  @IsString()
  newPassword: string;
}
