import { Express, Request, Response } from 'express';
import { Db } from 'mongodb';

export interface App extends Express {
    
}

export interface Request extends Request {
    db: Db,
    authenticate(username: string, password: string, done: Function): void | Function,

}

export interface Response extends Response {
    
}