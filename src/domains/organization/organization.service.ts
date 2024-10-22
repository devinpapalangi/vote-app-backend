import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateOrganizationRequest } from 'src/models/request/organizations/create.organization.request';
import {
  TextValue,
  TextValueResponse,
} from 'src/shared/models/text.value.response';
import {
  DATA_SOURCE_TAG,
  ORGANIZATION_REPOSITORY_TAG,
} from 'src/utils/constant/constant';
import { DataSource, Repository } from 'typeorm';
import { Organization } from './entity/organizations';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(DATA_SOURCE_TAG)
    private dataSource: DataSource,
    @Inject(ORGANIZATION_REPOSITORY_TAG)
    private organizationRepository: Repository<Organization>,
  ) {}

  async findAll(request: Request): Promise<TextValueResponse> {
    const organizations = await this.organizationRepository.find();

    const textValueMap: TextValue[] = organizations.map((organization) => ({
      value: organization.id,
      text: organization.name,
    }));

    const response = new TextValueResponse('Success', textValueMap);

    return response;
  }

  async create(organization: CreateOrganizationRequest, request: Request) {
    const newOrganization = this.organizationRepository.create(organization);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(newOrganization);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return organization;
  }
}
