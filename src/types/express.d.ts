import { Express, Request, Response } from 'express';
import { Connection } from 'mongoose';

export interface App extends Express {
    
}

export interface Request extends Request {
    db: Connection,
    authenticate(username: string, password: string, done: Function): void | Function,

}

export interface Response extends Response {
    
}