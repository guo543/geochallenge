import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    name: { type: String, required: true },
    imageLat: { type: String, required: true },
    imageLon: { type: String, required: true },
    numReports: { type: Number, required: true },
    uploader: { type: String, required: true },
    imageURL: {type:String,required:true},
    flagStatus: {type:String,required:false},
    approved: {type:Boolean, required: true},
    id: { type: String },
    difficultyLevel: { type: Number, default: 3 },
    averageGuessScore: { type: Number, default: -1 }
});

export default mongoose.model('Image', imageSchema);