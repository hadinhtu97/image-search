import mongoose from 'mongoose'

const recentSchema = new mongoose.Schema({
    query: String,
    created_at: Date,
    id: String,
    status: Boolean
})

export default mongoose.models.Recent || mongoose.model('Recent', recentSchema)