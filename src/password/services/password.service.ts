import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePasswordDto } from 'src/password/dtos';
import { Password } from '../models';

@Injectable()
export class PasswordService {
  constructor(
    @InjectModel(Password.name) private passwordModel: Model<Password>,
  ) {}
  async getPasswords(userId: string): Promise<Password[]> {
    console.log(await this.findAll());
    return [];
  }

  addPassword(password: CreatePasswordDto): string {
    this.create(password);
    return '';
  }

  /* test mongo from here downwards */
  async create(createPasswordDto: CreatePasswordDto): Promise<Password> {
    const createdPassword = new this.passwordModel(createPasswordDto);
    createdPassword.userId = '1';
    return createdPassword.save();
  }

  async findAll(): Promise<Password[]> {
    return this.passwordModel.find().exec();
  }
}
