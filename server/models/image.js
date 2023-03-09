import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    name: { type: String, required: true },
<<<<<<< HEAD
    location: { type: String, required: true },
    numReports: { type: Number, required: true },
    uploader: { type: String, required: true },
=======
    imageLat: { type: String, required: true },
    imageLon: { type: String, required: true },
    numReports: { type: Number, required: true },
    uploader: { type: String, required: true },
    imageURL: {type:String,required:true},
>>>>>>> faaff4a17140aa190f57bcd0bfa490711d0675e9
    id: { type: String }
});

export default mongoose.model('Image', imageSchema);