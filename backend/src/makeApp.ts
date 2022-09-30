import cors from 'cors';
import express from 'express';
import { lists, root, tasks } from './routes';

const makeApp = () => {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: '*',
    })
  );

  app.get('/', root);

  app.get('/lists', lists.getLists);
  app.post('/lists', lists.postList);
  app.get('/lists/:id', lists.getList);
  app.put('/lists/:id', lists.putList);
  app.delete('/lists/:id', lists.deleteList);

  app.get('/lists/:listId/tasks', tasks.getTasks);
  app.post('/lists/:listId/tasks', tasks.postTask);
  app.get('/tasks/:id', tasks.getTask);
  app.delete('/tasks/:id', tasks.deleteTask);

  return app;
};

export default makeApp;
