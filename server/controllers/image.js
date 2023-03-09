import Image from "../models/image.js";
import mongoose from "mongoose";

export const uploadImage = async (req, res) => {
    const result = await Image.create({
        name: "test",
        location: "test location",
        numReports: 0
    });

    res.status(200).json({ result: result });
}

export const reportImage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No image with that id');

    const image = await Image.findById(id);

    console.log(image);
    
    image.numReports = image.numReports + 1;
    const updatedImage = await Image.findByIdAndUpdate(id, image, { new: true });

    res.send(updatedImage);
}