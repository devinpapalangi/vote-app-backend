import { IsEmail, IsString } from 'class-validator';

export class CreateOrganizationRequest {
  @IsString()
  name: string;
}
