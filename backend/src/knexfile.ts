import type { Knex } from 'knex';
import path from 'path';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '../dev.sqlite3'),
    },
    migrations: {
      directory: path.join(__dirname, '/migrations'),
    },
    useNullAsDefault: true,
  },
};

export default config;
