import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    numReports: { type: Number, required: true },
    id: { type: String }
});

export default mongoose.model('Image', imageSchema);