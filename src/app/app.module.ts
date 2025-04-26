import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { ContactModule } from './contact/contact.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
  imports: [TenantModule, UserModule, TicketModule, ContactModule, WhatsappModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
