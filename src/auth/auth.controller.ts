import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './common/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/register')
  @Auth('admin')
  register(@Body() dto: CreateAuthDto) {
    return this.authService.register(dto);
  }

  @Post('local/login')
  login(@Body() dto: CreateAuthDto) {
    return this.authService.login(dto);
  }
}
