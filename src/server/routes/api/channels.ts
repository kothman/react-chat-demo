import authorizedMiddleware from '../../middleware/authorized';

export default function (app: any) {
    app.get('/api/v1/channels?', authorizedMiddleware);
    app.get('/api/v1/channels', function (req: any, res: any) {
        req.db.collection('channels').find({}, (err: any, channels: any) => {
            if (!channels)
                return res.state(400).json({ json: err });
            channels.toArray((err: any, channelArr: any[]) => {
                return res.json({ channels: channelArr });
            });
        });
    });
}