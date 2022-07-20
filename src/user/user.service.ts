import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {}
  create(createUserDto: UpdateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async byId(_id: string) {
    const user = await this.userModel.findById(_id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    return await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  remove(id: string) {
    const user = this.userModel.findById(id);
    if (user.role === 'admin') {
      throw new Error('Cannot delete admin user');
    }
    // todo norm error
    // todo norm error
    // todo norm error
    // todo norm error

    return this.userModel.findByIdAndRemove(id).exec();
  }
}
