import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { OrganizationController } from './organization.controller';
import { organizationProvider } from './organization.providers';
import { OrganizationService } from './organization.service';

@Module({
  imports: [DatabaseModule],
  providers: [...organizationProvider, OrganizationService],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
