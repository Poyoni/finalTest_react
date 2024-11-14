import  Mongoose , {Schema, Document} from "mongoose";

export interface IOrganization extends Document {
    name: string;
    resources: {
        name: string;
        amount: number;
    }[];
    budget: number;
}

const organizationSchema = new Schema<IOrganization>({
    name: {
        type: String,
        required: true
    },
    resources: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
                }
            }
        ],
        required: true
    },
    budget: {    
        type: Number,
        required: true
    }
});

export const Organization = Mongoose.model<IOrganization>('Organization', organizationSchema);
