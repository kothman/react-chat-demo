import {Schema, Model, model, Document} from 'mongoose';

export interface IWidget extends Document {
    shortId: string,
    domain: string,
    createdAt: Date,
    updatedAt: Date,
}

const widgetSchema: Schema = new Schema({
    shortId: {
        type: String,
        // default should generate id for us
    },
    domain: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Widget: Model<IWidget> = model('Widget', widgetSchema);
export default Widget;