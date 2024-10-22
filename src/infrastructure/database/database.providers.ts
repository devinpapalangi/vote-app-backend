import configuration from 'src/config/config'; // Import the config function
import { Organization } from 'src/domains/organization/entity/organizations';
import { User } from 'src/domains/user/entity/users';
import { DATA_SOURCE_TAG } from 'src/utils/constant/constant';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DATA_SOURCE_TAG,
    useFactory: async () => {
      const config = configuration(); // Call the function to get the config object

      const dataSource = new DataSource({
        type: config.database.type, // Adjust type as needed (e.g., 'postgres', 'mysql')
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        entities: [User, Organization],
        synchronize: config.database.synchronize,
      });

      return dataSource.initialize();
    },
  },
];
