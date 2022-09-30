import { RouteHandler } from './types';

const root: RouteHandler = (_request, response) => {
  response.send('Task List API');
};

export default root;
