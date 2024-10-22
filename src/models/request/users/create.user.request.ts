import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserRole } from 'src/domains/user/entity/users';

export class UpsertUserRequest {
  @IsString({
    message: 'Name must be a string',
    groups: ['default', 'update'],
  })
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsString({
    message: 'Password must be a string',
    groups: ['default', 'update'],
  })
  password: string;

  @IsUUID('all', {
    message: 'Organization must be a valid UUID',
    groups: ['default', 'update'],
  })
  organization: string;
}
