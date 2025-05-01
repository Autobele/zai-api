import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from 'src/config/database/database.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  providers: [QueueService],
  controllers: [QueueController]
})
export class QueueModule { }
