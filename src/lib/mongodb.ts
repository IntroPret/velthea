import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGO;

if(!MONGODB_URL){
    throw new Error ("Please define mongo environment variable")
}

declare global {
    var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

async function connectToDatabase() {
    if(mongoose.connection.readyState === 1){
        return mongoose;
    }

    if (!global._mongoosePromise){
        const opts = {
            bufferCommands: false,
        }
        global._mongoosePromise = mongoose.connect(MONGODB_URL!, opts).then(() => mongoose);
    }
    
    return global._mongoosePromise;
}

export default connectToDatabase;