import { PasswordModule } from './password/password.module';
import { PasswordController } from './password/controllers/password.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Password } from './password/models';

@Module({
  imports: [MongooseModule.forRoot('<connection-string>'), PasswordModule],
})
export class AppModule {}
