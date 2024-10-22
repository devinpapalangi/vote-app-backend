import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { organizationProvider } from '../organization/organization.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, ...organizationProvider, UserService],
  controllers: [UserController],
})
export class UserModule {}
