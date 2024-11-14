import mongoose, { Schema, Document } from 'mongoose';

interface Resource {
  name: string;
  amount: number;
}


interface IUser extends Document {
  username: string;
  password: string;
  organization: string;
  region?: string;
  resources: Resource[];
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    organization: { type: String, required: true, enum: ['IDF', 'Hezbollah', 'Hamas', 'Houthis', 'IRGC'] },
    region: { type: String, enum: ['North', 'South', 'Center', 'West Bank'] },
    resources: [{ name: String, amount: Number }],
  },
);


const User = mongoose.model<IUser>('User', UserSchema);

export default User;