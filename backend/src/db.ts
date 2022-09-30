import knex from 'knex';
import type { Knex } from 'knex';
import config from './knexfile';
import { Response } from 'express';

const db = knex(config.development);

type TransactionHandler = (trx: Knex.Transaction) => void;

const runTransaction = async (
  response: Response,
  transactionHandler: TransactionHandler
) => {
  try {
    await db.transaction(transactionHandler);
  } catch (error) {
    if (error?.message?.includes('UNIQUE constraint failed')) {
      response.status(400);
    } else if (error?.message?.includes('NOT NULL constraint failed')) {
      response.status(400);
    } else if (error?.message?.includes('cannot be empty')) {
      response.status(400);
    } else if (
      error?.message?.includes(
        'Update data does not contain any values to update.'
      )
    ) {
      response.status(400);
    } else {
      response.status(500);
    }
    response.json({ error: error?.message || 'Unknown' });
    console.log(error);
  }
};

export { runTransaction, TransactionHandler };

export default db;
