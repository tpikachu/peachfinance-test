import { Request, Response } from 'express';

type RouteHandler = (request: Request, response: Response) => void;

export { RouteHandler };
