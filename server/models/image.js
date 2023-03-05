import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    name: String,
    numReports: Number,
    location: String
})

const Image = mongoose.model('Image', imageSchema);

export default Image;