import db from '../../db';

const getTasksForList: (listId: number) => Promise<any[]> = async (listId) => {
  const tasks = await db
    .select()
    .table('task')
    .where({ list_id: listId })
    .orderBy('id');
  return tasks;
};

export default getTasksForList;
