import { Collection, MongoError } from 'mongodb';
import * as bcrypt from 'bcryptjs';
import * as validator from 'validator';

import authorizedMiddleware from '../../middleware/authorized';
import adminMiddleware from '../../middleware/admin';
import { App, Request, Response } from '../../../types/express';

export default function(app: App) {

}