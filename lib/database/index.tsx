import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

let cached = (global as any).mongoose || {conn: null, promise: null};

export const connectToDatabase = async () => {

    // await new Promise(resolve => setTimeout(resolve, 5000));

    if (cached.conn) return cached.conn
    
    if(!MONGODB_URI) throw new Error('MongoDB_URI is missing')

    cached.promise = cached.process || mongoose.connect(MONGODB_URI,{
        dbName:'streamTest',
        bufferCommands:false,
    })

    cached.conn = await cached.promise;
    console.log('connected to db')
 
    return cached.conn
}