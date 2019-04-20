import {Request, Response} from '../../types/express';
import Channel, {IChannel} from '../models/Channel';

export default {
    channels: (req: Request, res: Response) => {
        // If no channels exist, create a 'general' and 'random' channel
        return Channel.countDocuments().exec().then((count: number) => {
            let p = new Promise((resolve, reject) => {
                if (count !== 0) {
                    return resolve();
                }
                Channel.create([{name: 'general'}, {name: 'random'}]).then(() => {
                    return resolve();
                }).catch((err: Error) => {
                    return reject(err);
                });
            });
            return p.then(() => {
                Channel.find().exec().then((channels: IChannel[]) => {
                    return res.status(200).json({channels: channels});
                }).catch((err: Error) => {
                    console.log(err);
                    return res.status(500).json({ error: 'Something went wrong while trying to fetch channels' });
                });
            }).catch((err: Error) => {
                console.error(err);
                return res.status(500).json({error: 'Something went wrong while trying to create default channels'});
            });
        }).catch((err: Error) => {
            console.error(err);
            return res.status(500).json({error: 'Something went wrong while counting channels'});
        });
    },
    delete: (req: Request, res: Response) => {
        
    },
    create: (req: Request, res: Response) => {

    }
}