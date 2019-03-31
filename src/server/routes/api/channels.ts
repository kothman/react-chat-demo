import authorizedMiddleware from '../../middleware/authorized';
import { Collection } from 'mongodb';
import * as validator from 'validator';

export default function (app: any) {
    app.get('/api/v1/channel*', authorizedMiddleware);
    app.get('/api/v1/channels', function (req: any, res: any) {
        req.db.collection('channels', (e: Error, coll: Collection) => {
            let p = new Promise((resolve) => {
                coll.find({}).count((e, count: number) => {
                    if (count === 0) {
                        coll.insertMany(
                            [{ name: 'general' }, { name: 'random' }],
                            () => resolve());
                    } else {
                        resolve();
                    }
                })
            });
            p.then(() => {
                coll.find({}).toArray((err: Error, arr: any) => {
                    res.json({ channels: arr });
                });
            })
        });
    });
    app.get('/api/v1/channel/delete/:channel', function (req: any, res: any) {
        if (validator.isEmpty(req.params.channel)) {
            return res.status(400).json({error: 'Invalid channel name'});
        }
        return req.db.collection('channels', (e: Error, coll: Collection) => {
            let p = new Promise((resolve, reject) => {
                coll.find({name: req.params.channel}).count((e, count: number) => {
                    // make sure we only try to delete the record if one match was found
                    if (count === 1) {
                        return resolve();
                    }
                    return reject();
                });
            });
            p.then(() => {
                coll.deleteOne({name: req.params.channel}).then(() => {
                    return res.json({success: true});
                });
            }).catch(() => {
                return res.status(400).json({error: 'Returned channels count not equal to 1'});
            })
            return p;
        });
    });
    app.post('/api/v1/channel/create', function (req: any, res: any) {
        if (validator.isEmpty(req.body.channelName)) {
            return res.status(400).json({ error: 'Invalid channel name' });
        }
        return req.db.collection('channels', (e: Error, coll: Collection) => {
            let p = new Promise((resolve, reject) => {
                coll.countDocuments({name: req.body.channelName}, (err, count) => {
                    if (count!==0) {
                        return reject();
                    }
                    return resolve();
                });
            });
            return p.then(() => {
                return coll.insertOne({name: req.body.channelName}).then(() => {
                    return res.json({success: true});
                });
            }).catch(() => {
                return res.status(400).json({error: 'Channel already exists'});
            })
        });
    });
}