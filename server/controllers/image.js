import Image from "../models/image.js";
import mongoose from "mongoose";

export const uploadImage = async (req, res) => {
    const { uploader } = req.body;

    const result = await Image.create({
        name: "test",
        location: "test location",
        uploader: uploader,
        numReports: 0
    });

    res.status(200).json({ result: result });
}

export const reportImage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No image with that id');

    const image = await Image.findById(id);

    console.log(image);
    
    const threshold = 5;
    const newNumReport = image.numReports + 1;

    if (newNumReport > threshold) {
        await Image.findByIdAndRemove(id);
        res.json({ result: "image deleted" });
        return;
    }

    image.numReports = newNumReport;
    const updatedImage = await Image.findByIdAndUpdate(id, image, { new: true });

    res.json(updatedImage);
}