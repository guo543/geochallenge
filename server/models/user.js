import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: String,
    recordCount: Number,
    records: [Number],
    averageScore: Number,
    id: { type: String },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model('User', userSchema);