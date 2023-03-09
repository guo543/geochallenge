import AWS from 'aws-sdk';
import Image from '../models/image.js';
import multer from 'multer';
import mongoose from "mongoose";
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
export const uploadImage = async (req, res) => {

  const upload = multer();
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: 'Error uploading image' });
    }
    const file = req.file;
    const { imageLat, imageLon } = req.body;
    console.log(req.params)
    const userID = req.params.id;
    const key = `${userID}/${Date.now()}-${file.originalname}`;
    const bucketName = 'useruploadedimages';
    const imageName = file.originalname
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ACL: 'public-read', 
      ContentType: file.mimetype 
    };
    s3.upload(params, async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error uploading image to S3' });
      }
      try {
        const result = await Image.create({
          name: imageName,
          imageLat: imageLat,
          imageLon:imageLon,
          uploader: userID,
          numReports: 0,
          imageURL:data.Location
        });
        res.status(200).json({ message: 'Image uploaded successfully', image: result });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error saving image to database' });
      }
    });
  });
};