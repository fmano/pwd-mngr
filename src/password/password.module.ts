import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordController } from './controllers/password.controller';
import { Password, PasswordSchema } from './models';
import { PasswordService } from './services/password.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Password.name, schema: PasswordSchema },
    ]),
  ],
  controllers: [PasswordController],
  providers: [PasswordService],
})
export class PasswordModule {}
