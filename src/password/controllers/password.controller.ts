import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreatePasswordDto } from '../dtos';
import { Password } from '../models';
import { PasswordService } from '../services/password.service';

@Controller('api/passwords')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Get('/:id')
  async getPasswords(@Param('id') userId: string): Promise<Password[]> {
    if (userId !== null && userId !== '') {
      try {
        return await this.passwordService.getPasswords(userId);
      } catch (error) {
        throw error;
      }
    }
    return [];
  }

  @Post('/:id')
  addPassword(
    @Body() password: CreatePasswordDto,
    @Param('id') userId: string,
  ): string {
    if (
      password === null ||
      password.key === null ||
      password.password === null
    ) {
      throw new BadRequestException('Password object is invalid');
    }

    if (userId === null) {
      throw new BadRequestException('User ID is invalid');
    }

    return this.passwordService.addPassword(password);
  }
}
