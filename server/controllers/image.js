import Image from "../models/image.js";

export const uploadImage = async (req, res) => {
    const result = await Image.create({ name: "test", numReports: 5, localtion: "test location" });

    res.status(200).json({ result: result });
}