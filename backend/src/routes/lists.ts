import db, { runTransaction } from '../db';
import getTasksForList from './protected/getTasksForList';
import { RouteHandler } from './types';

const getLists: RouteHandler = async (request, response) => {
  const includeString = (request.query.include || '') as string;
  const includeArray = includeString.split(',');
  const lists = await db.select().table('list').orderBy('id');
  if (includeArray.includes('tasks')) {
    const listsWithTasks = await Promise.all(
      lists.map(async (list) => {
        const tasks = await getTasksForList(list.id);
        return {
          ...list,
          tasks,
        };
      })
    );
    response.json(listsWithTasks);
  } else {
    response.json(lists);
  }
};

const getList: RouteHandler = async (request, response) => {
  const includeString = (request.query.include || '') as string;
  const includeArray = includeString.split(',');
  const { id } = request.params;
  const [list] = await db
    .select()
    .table('list')
    .where({ id: +id });
  if (!list) {
    response.status(404).end();
  } else if (includeArray.includes('tasks')) {
    const tasks = await getTasksForList(list.id);
    const listWithTasks = {
      ...list,
      tasks,
    };
    response.json(listWithTasks);
  } else {
    response.json(list);
  }
};

const postList: RouteHandler = async (request, response) => {
  await runTransaction(response, async (trx) => {
    const { name } = request.body;
    if (!name.trim()) throw Error('name cannot be empty');
    const [newId] = await trx('list').insert({ name });
    response.status(201).setHeader('x-id', newId).end();
  });
};

const putList: RouteHandler = async (request, response) => {
  await runTransaction(response, async (trx) => {
    const { name } = request.body;
    const { id } = request.params;
    if (!name.trim()) throw Error('name cannot be empty');
    const [list] = await trx
      .select()
      .table('list')
      .where({ id: +id });
    if (!list) {
      response.status(404).end();
    } else {
      await trx('list')
        .update({ name })
        .where({ id: +id });
      response.status(200).end();
    }
  });
};

const deleteList: RouteHandler = async (request, response) => {
  await runTransaction(response, async (trx) => {
    const { id } = request.params;
    const [list] = await trx
      .select()
      .table('list')
      .where({ id: +id });
    if (!list) {
      response.status(404).end();
    } else {
      await trx('list')
        .delete()
        .where({ id: +id });
      response.status(200).end();
    }
  });
};

const lists = { getLists, getList, postList, deleteList, putList };

export default lists;
