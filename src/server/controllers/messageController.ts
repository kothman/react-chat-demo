import {Request, Response} from '../../types/express';
import Message, {IMessage} from '../models/Message';
export default {
    messages: (req: Request, res: Response) => {
        return Message.find({channel: req.params.channel})
            .skip(parseInt(req.params.offest))
            .sort({_id: -1})
            .limit(20)
            .exec().then((messages: IMessage[]) => {
                return res.status(200).json({
                     messages: messages.map((m: IMessage) => {
                        return {
                            text: m.text,
                            created: m.createdAt,
                            userEmail: m.userEmail,
                            channel: m.channel,
                            _id: m._id
                        };
                     }).reverse()
                 })
        }).catch((err: Error) => {
            return res.status(400).json({ error: 'something went wrong trying to fetch messages' });
        })
    }
}