import { DataSource } from 'typeorm';
import { User } from './entity/users';
import {
  DATA_SOURCE_TAG,
  USER_REPOSITORY_TAG,
} from 'src/utils/constant/constant';

export const userProviders = [
  {
    provide: USER_REPOSITORY_TAG,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE_TAG],
  },
];
