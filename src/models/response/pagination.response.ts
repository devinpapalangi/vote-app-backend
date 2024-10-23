import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponse<T> {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T[];

  @ApiProperty()
  metadata: {
    page: number;
    size: number;
    totalData: number;
    totalPage: number;
  };
}
