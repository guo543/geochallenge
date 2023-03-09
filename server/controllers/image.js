import Image from "../models/image.js";

export const uploadImage = async (req, res) => {
    const result = await Image.create({
        name: "test",
        location: "test location",
        numReports: 0
    });

    res.status(200).json({ result: result });
}