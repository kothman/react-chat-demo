import { verify } from 'jsonwebtoken';
import { Token } from '../../types/jwt';
import { Request, Response } from '../../types/express';
const env = require('../../../env');
export default function(req: Request, res: Response | any, next: Function) {
    var token = req.session.token || req.headers['x-access-token'];
    if (!token) {
        if (!res.status) return next();
        return res.status(401).json({ error: 'Not authorized' });
    }

    verify(token, env.secret, (err: Error, decoded: Token) => {
        if (err && res.status) return res.status(401).send({ error: 'Not authorized' });
        else req.user = decoded;
        return next();
    });    
}