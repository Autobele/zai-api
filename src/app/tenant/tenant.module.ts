import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { DatabaseModule } from 'src/config/database/database.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [DatabaseModule, UserModule, AuthModule],
    providers: [TenantService, UserService],
    controllers: [TenantController]
})
export class TenantModule { }
