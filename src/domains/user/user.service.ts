import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { UpsertUserRequest } from 'src/models/request/users/create.user.request';
import { PaginationRequest } from 'src/models/request/users/pagination.request';
import { PaginationResponse } from 'src/models/response/pagination.response';
import { SingleDataResponse } from 'src/shared/models/single.data.response';
import { hashPassword } from 'src/utils/auth/hashing';
import {
  DATA_SOURCE_TAG,
  ORGANIZATION_REPOSITORY_TAG,
  USER_REPOSITORY_TAG,
} from 'src/utils/constant/constant';
import { DataSource, Repository } from 'typeorm';
import { Organization } from '../organization/entity/organizations';
import { User } from './entity/users';

@Injectable()
export class UserService {
  constructor(
    @Inject(DATA_SOURCE_TAG)
    private dataSource: DataSource,
    @Inject(USER_REPOSITORY_TAG)
    private userRepository: Repository<User>,
    @Inject(ORGANIZATION_REPOSITORY_TAG)
    private organizationRepository: Repository<Organization>,
  ) {}

  async findAll(
    paginationDto: PaginationRequest,
    request: Request,
  ): Promise<PaginationResponse<User>> {
    const { page, size, search } = paginationDto;

    const offset = size! * (page! - 1) || 0;

    const query = this.userRepository
      .createQueryBuilder('users')
      .skip(offset)
      .take(size);

    query.where('users.role = :role', { role: 'USER' });

    if (search) {
      query.where('LOWER(users.name) LIKE Lower(:name)', {
        name: `%${search}%`,
      });
    }

    const [data, count] = await query.getManyAndCount();
    const totalPage = Math.ceil(count / size!) || 0;

    const response: PaginationResponse<User> = new PaginationResponse(
      'Success',
      data,
      {
        //@ts-ignore
        page,
        //@ts-ignore
        size,
        count,
        totalPage,
      },
    );

    return response;
  }

  async create(
    upsertUserRequest: UpsertUserRequest,
    request: Request,
  ): Promise<SingleDataResponse<Omit<User, 'password'>>> {
    const queryRunner = this.dataSource.createQueryRunner();

    const isValidOrganization = await this.organizationRepository.findOneBy({
      id: upsertUserRequest.organization,
    });

    if (!isValidOrganization) {
      throw new NotFoundException('Organization not found');
    }

    const isEmailExists = await this.userRepository.findOneBy({
      email: upsertUserRequest.email,
    });

    if (isEmailExists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await hashPassword(upsertUserRequest.password);

    const newUser = this.userRepository.create({
      name: upsertUserRequest.name,
      email: upsertUserRequest.email,
      password: hashedPassword,
    });
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(newUser);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    const { password, ...userWithoutPassword } = newUser;

    const response = new SingleDataResponse('Success', userWithoutPassword);

    return response;
  }

  async findById(id: string): Promise<SingleDataResponse<User>> {
    const user = await this.userRepository.findOneBy({
      id: id,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const response = new SingleDataResponse('Success', user);

    return response;
  }

  async delete(id: string): Promise<SingleDataResponse<User>> {
    const user = await this.userRepository.findOneBy({
      id: id,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);

    const response = new SingleDataResponse('Success', user);

    return response;
  }

  async update(
    id: string,
    upsertUserRequest: UpsertUserRequest,
  ): Promise<SingleDataResponse<User>> {
    const user = await this.userRepository.findOneBy({
      id: id,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.name = upsertUserRequest.name;
    user.email = upsertUserRequest.email;

    const newPassword = await hashPassword(upsertUserRequest.password);
    user.password = newPassword;

    const isOrganizationExists = await this.organizationRepository.findOneBy({
      id: upsertUserRequest.organization,
    });

    if (!isOrganizationExists) {
      throw new NotFoundException('Organization not found');
    }

    user.organization = isOrganizationExists;

    await this.userRepository.save(user);

    const response = new SingleDataResponse('Success', user);

    return response;
  }
}
