import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: String,
    id: { type: String }
});

export default mongoose.model('User', userSchema);