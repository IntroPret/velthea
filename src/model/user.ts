import mongoose, {Document, Model, Schema} from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  authProvider: "local" | "google";
  linkedProviders?: string[];
  image?: string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        authProvider: {
            type: String,
            enum: ["local", "google"],
            required: true,
        },
        linkedProviders: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User;