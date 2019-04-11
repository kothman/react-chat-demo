import authorizedMiddleware from '../../middleware/authorized';
import {ObjectID, Collection, MongoError} from 'mongodb'; 
import { App, Request, Response } from '../../../types/express';

export default function (app: App) {
    app.get('/api/v1/messages?', authorizedMiddleware);
    app.get('/api/v1/messages/:channel/:offset', function (req: Request, res: Response) {
        let messages: Collection = req.db.collection('messages');
        messages.find(
            {channel: req.params.channel},
            {skip: parseInt(req.params.offset), sort: [['_id', -1]], limit: 20})
            .toArray((err: any, messages: any) => {
                if (!messages)
                    return res.status(400).json({json: err});
                messages.toArray((err: MongoError, msgArray: any[]) => {
                    return res.json({ messages: msgArray.map((m) => {
                            let objID: ObjectID = new ObjectID(m['_id']);
                            m.created = objID.getTimestamp();
                            return m;
                        }).reverse()
                    });
                });
        });
    });
}