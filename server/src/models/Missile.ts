import  Mongoose , {Schema, Document} from "mongoose";

export interface IMissile extends Document {
    name: string;
    description: string;
    speed: number;
    intercepts: string[];
    price: number;
}

const missileSchema = new Schema<IMissile>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    speed: {
        type: Number,
        required: true
    },
    intercepts: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export const Missile = Mongoose.model<IMissile>('Missile', missileSchema);
