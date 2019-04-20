import { Express, Request, Response } from 'express';
import { Connection, Error } from 'mongoose';
import { IUser } from '../server/models/User';
import { Token } from './jwt';

export interface App extends Express {
    
}

export interface Request extends Request {
    db: Connection,
    authenticate(username: string, password: string, done: (user: boolean | IUser, err: (null | Error)) => void): void,
    logout(): void,
    user: Token,
    csrfToken(): string,
    issueNewToken(user: any): void,
}

export interface Response extends Response {
    
}