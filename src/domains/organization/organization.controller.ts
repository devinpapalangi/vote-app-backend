import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateOrganizationRequest } from 'src/models/request/organizations/create.organization.request';
import { ValidationPipe } from 'src/pipes/validation.pipes';
import { Organization } from './entity/organizations';
import { OrganizationService } from './organization.service';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}
  @Get()
  @ApiResponse({
    status: 200,
    type: [Organization],
    description: 'Get all users',
  })
  async findAll(@Req() request: Request) {
    return await this.organizationService.findAll(request);
  }

  @Post()
  async create(
    @Body()
    createOrganizationRequest: CreateOrganizationRequest,
    @Req() request: Request,
  ) {
    return await this.organizationService.create(
      createOrganizationRequest,
      request,
    );
  }
}
