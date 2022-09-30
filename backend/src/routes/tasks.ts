import db, { runTransaction } from '../db';
import getTasksForList from './protected/getTasksForList';
import { RouteHandler } from './types';

const getTasks: RouteHandler = async (request, response) => {
  const { listId } = request.params;
  const tasks = await getTasksForList(+listId);
  response.json(tasks);
};

const getTask: RouteHandler = async (request, response) => {
  const { id } = request.params;
  const [task] = await db
    .select()
    .table('task')
    .where({ id: +id });
  if (!task) {
    response.status(404).end();
  } else {
    response.json(task);
  }
};

const postTask: RouteHandler = async (request, response) => {
  await runTransaction(response, async (trx) => {
    const { text } = request.body;
    const { listId } = request.params;
    if (!text.trim()) throw Error('text cannot be empty');
    const [list] = await trx
      .select()
      .table('list')
      .where({ id: +listId });
    if (!list) {
      response.status(404).end();
    } else {
      const [newId] = await trx('task').insert({ text, list_id: +listId });
      response.status(201).setHeader('x-id', newId).end();
    }
  });
};

const deleteTask: RouteHandler = async (request, response) => {
  await runTransaction(response, async (trx) => {
    const { id } = request.params;
    const [task] = await trx
      .select()
      .table('task')
      .where({ id: +id });
    if (!task) {
      response.status(404).end();
    } else {
      await trx('task')
        .delete()
        .where({ id: +id });
      response.status(200).end();
    }
  });
};

const tasks = { getTasks, getTask, postTask, deleteTask };

export default tasks;
