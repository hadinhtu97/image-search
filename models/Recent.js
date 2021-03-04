import mongoose from 'mongoose'

const recentSchema = new mongoose.Schema({
    query: String,
    created_at: Date,
    ip: String,
    success: Boolean
})

export default mongoose.models.Recent || mongoose.model('Recent', recentSchema)