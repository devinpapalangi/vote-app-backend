import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

interface Config {
  app: AppConfig;
  database: DatabaseConfig;
}

interface AppConfig {
  name: string;
  port: number;
}

interface DatabaseConfig {
  type: 'postgres' | 'mysql' | 'sqlite' | 'better-sqlite3';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

export default (): Config => {
  try {
    const environment = process.env.NODE_ENV || 'development';

    const configFilename = `config-${environment}.yaml`;

    // this is weird
    const config = yaml.load(
      readFileSync(join(__dirname, `config/${configFilename}`), 'utf8'),
    ) as Config;

    return config; // Return the loaded configuration
  } catch (error) {
    console.error('Error loading configuration:', error);
    throw new Error('Failed to load configuration file');
  }
};
