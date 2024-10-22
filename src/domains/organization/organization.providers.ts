import { DataSource } from 'typeorm';
import {
  DATA_SOURCE_TAG,
  ORGANIZATION_REPOSITORY_TAG,
} from 'src/utils/constant/constant';
import { Organization } from './entity/organizations';

export const organizationProvider = [
  {
    provide: ORGANIZATION_REPOSITORY_TAG,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Organization),
    inject: [DATA_SOURCE_TAG],
  },
];
