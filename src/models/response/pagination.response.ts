import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponse<T> {
  constructor(
    message: string,
    data: T[],
    metadata: {
      page: number;
      size: number;
      totalData: number;
      totalPage: number;
    },
  ) {
    this.message = message;
    this.data = data;
    this.metadata = metadata;
  }
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
