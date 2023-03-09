import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    numReports: { type: Number, required: true },
    id: { type: String }
});

const Image = mongoose.model('Image', imageSchema);

export default Image;