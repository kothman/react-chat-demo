import authorizedMiddleware from '../../middleware/authorized';
import {ObjectID} from 'mongodb'; 

export default function (app: any) {
    app.get('/api/v1/messages?', authorizedMiddleware);
    app.get('/api/v1/messages/:channel', function (req: any, res: any) {
        req.db.collection('messages').find({channel: req.params.channel}, {limit: 20}, (err: any, messages: any) => {
            if (!messages)
                return res.state(400).json({json: err});
            messages.toArray((err: any, msgArray: any[]) => {
                return res.json({ messages: msgArray.map((m) => {
                        let objID: ObjectID = new ObjectID(m['_id']);
                        m.created = objID.getTimestamp();
                        return m;
                    })
                });
            });
        });
    });
}