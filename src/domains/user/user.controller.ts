import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Request } from 'express';
import { UpsertUserRequest } from 'src/models/request/users/create.user.request';
import { PaginationRequest } from 'src/models/request/users/pagination.request';
import { User } from './entity/users';
import { UserService } from './user.service';
import { PaginationResponse } from 'src/models/response/pagination.response';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'size', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    example: 'john_doe',
  })
  @ApiResponse({
    status: 200,
    type: PaginationResponse,
    description: 'Get all users',
  })
  async findAll(
    @Query() query: PaginationRequest,
    @Req() request: Request,
  ): Promise<PaginationResponse<User>> {
    return await this.userService.findAll(query, request);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    type: User,
    description: 'Get user by id',
  })
  async findOne(
    @Req() request: Request,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.userService.findById(id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    type: User,
    description: 'Delete user by id',
  })
  async delete(
    @Req() request: Request,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.userService.delete(id);
  }

  @Post()
  async create(
    @Body() upsertUserRequest: UpsertUserRequest,
    @Req() request: Request,
  ) {
    return await this.userService.create(upsertUserRequest, request);
  }

  @Put(':id')
  async update(
    @Req() request: Request,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() upsertUserRequest: UpsertUserRequest,
  ) {
    return await this.userService.update(id, upsertUserRequest);
  }
}
