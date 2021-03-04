import mongoose from 'mongoose'

export default async () => {
    if (mongoose.connection.readyState >= 1) return
    return mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
}