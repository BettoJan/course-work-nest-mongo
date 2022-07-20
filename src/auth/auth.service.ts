import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { genSalt, hash, compare } from 'bcryptjs';
import {
  ALREADY_REGISTERED_ERROR,
  PASSWORD_NOT_MATCH_ERROR,
  USER_NOT_FOUND_ERROR,
} from './constants/user.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateAuthDto) {
    const oldUser = await this.userModel.findOne({ login: dto.login });
    if (oldUser) {
      throw new UnauthorizedException(ALREADY_REGISTERED_ERROR);
    }
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      login: dto.login,
      passwordHash: await hash(dto.password, salt),
    });
    const user = await newUser.save();

    const tokens = await this.issueToken(String(user._id));
    return user;
  }

  async login(dto: CreateAuthDto) {
    const user = await this.validateUser(dto.login, dto.password);

    const tokens = await this.issueToken(String(user._id));

    return {
      user,
      ...tokens,
    };
  }

  async validateUser(login: string, password: string): Promise<UserModel> {
    const user = await this.userModel.findOne({ login });
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const validPassword = await compare(password, user.passwordHash);

    if (!validPassword) {
      throw new UnauthorizedException(PASSWORD_NOT_MATCH_ERROR);
    }

    return user;
  }

  async issueToken(userId: string) {
    const data = { _id: userId };

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '30d',
    });

    return { accessToken };
  }
}
