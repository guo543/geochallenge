import AWS from 'aws-sdk';
import Image from '../models/image.js';
import multer from 'multer';
import mongoose from "mongoose";

export const reportImage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No image with that id');

    const image = await Image.findById(id);

    console.log("Image reported: " + image);

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
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-2'
    });
    const upload = multer();
    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: 'Error uploading image' });
        }

        if (req.file === undefined) {
            return res.status(400).json({ message: 'No image provided' });
        }

        const file = req.file;
        const { imageLat, imageLon, userID } = req.body;
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
                return res.status(500).json({ message: 'Error uploading image to S3: ' + err.name });
            }
            const imageURL = data.Location;
            try {

                const rek = new AWS.Rekognition({
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                    region: 'us-east-2'
                });
                
                rek.detectModerationLabels({
                    Image: {
                        "S3Object": { 
                            "Bucket": bucketName,
                            "Name": key
                        }
                    }
                }, async (err, data) => {
                    if (err) {
                        console.log(err)
                        res.status(502).json({message: 'Failed to detect inappropriate content from uploaded image. '})
                    } else {
                        const moderationTags = data['ModerationLabels'];
                        if (moderationTags.length > 0 && moderationTags[0]['Confidence'] > 85) {
                            console.log("Moderation labels detected. ");
                            console.log(data['ModerationLabels']);
                            s3.deleteObject({
                                Bucket: bucketName,
                                Key: key
                            }, (err, data) => {
                                if (err) {
                                    res.status(502).json({message: 'Failed to delete inappropriate content. '})
                                } else {
                                    res.status(400).json({message: 'Inappropiate image detected. Image removed from database. '})
                                }
                            }) 
                        } else {
                            console.log("image url: " + data.Location)
                            const result = await Image.create({
                                name: imageName,
                                imageLat: imageLat,
                                imageLon: imageLon,
                                uploader: userID,
                                numReports: 0,
                                approved: false,
                                imageURL: imageURL
                            });
                            res.status(200).json({ message: 'Image uploaded successfully', image: result });
                        }
                    }
                })

            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Error saving image to database' });
            }
        });
    });
};

export const getImagesByUserId = async (req, res) => {
    const userId = req.query.userID;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).send('User with id ' + userId + ' does not exist.');
    }
    
    const images = await Image.find({uploader: userId});
    res.status(200).json({ message: 'success', images: images });
}

export const getRandomImage = async (req, res) => {
    try {
        const image = await Image.aggregate([
            { $match : { approved : true} },
            { $sample: { size : 1 } }
        ]);    
        res.status(200).json({ message: 'success', image: image });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error retrieving image from database'});
    }
}

const getDifficultyLevel = (score) => {
    if (score > 666) {
        return 4;
    }

    if (score > 333) {
        return 3;
    }

    return 2;
}

export const getRandomImageWithScore = async (req, res) => {
    const averageScore = req.query.averageScore;
    console.log(averageScore);
    const targetDifficulty = getDifficultyLevel(averageScore);
    console.log(targetDifficulty);

    try {
        const image = await Image.aggregate([
            { $match : { approved : true} },
            { $match : { $and: [
                {difficultyLevel: { $lte: targetDifficulty + 1 }},
                {difficultyLevel: { $gte: targetDifficulty - 1 }}
            ]}},
            { $sample: { size : 1 } }
        ]);

        if (image.length === 0) {
            image = await Image.aggregate([
                { $match : { approved : true} },
                { $sample: { size : 1 } }
            ]);
        }

        res.status(200).json({ message: 'success', image: image });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error retrieving image from database'});
    }
}

// Returns info abt if a image is flagged & pending approval
export const getFlagged = async (req, res) => {
    const { imageID } = req.query;
    if (!imageID) {
        res.status(400).send("query params missing.");
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(imageID)) {
        return res.status(404).send('Image with id ' + imageID + ' does not exist.');
    }
    
    const images = await Image.findOne({_id: imageID}, {flagStatus: 1 });

    if (!images.flagStatus || images.flagStatus == 'clear') {
        res.status(200).json({ message: 'success', flagStatus: 'clear' });
    } else {
        res.status(200).json({ message: 'success', flagStatus: 'flagged' });
    }
}

// set the flagStatus field to either 'flagged' or 'clear'
export const setFlagged = async (req, res) => {
    const { imageID, flagStatus } = req.query;
    if (!imageID || !flagStatus) {
        res.status(400).send("query params missing.");
        return;
    }

    if (!['flagged', 'clear'].includes(flagStatus)) {
        res.status(400).send("query param flagStatus must be one of : \'flagged\' \'clear\' ");
        return;
    }
    
    if (!mongoose.Types.ObjectId.isValid(imageID)) {
        return res.status(404).send('Image with id ' + imageID + ' does not exist.');
    }

    try {
        await Image.updateOne({_id: imageID}, { $set: {flagStatus: flagStatus } });
    } catch (err) {
        res.status(503).send("Failed to update image flag status");
        return;
    }

    res.status(200).json({ message: 'success', imageID: imageID, flagStatus: flagStatus });
}

export const getUnapprovedImage = async (req, res) => {
    try {
        const image = await Image.find({ "approved" : false }).sort({"_id":1}).limit(1);
        res.status(200).json({ message: 'success', image: image });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error retrieving image from database'});
    }
}

const getDifficultyLevelForImage = (score) => {
    if (score >= 800) {
        return 1;
    }

    if (score >= 600) {
        return 2;
    }

    if (score >= 400) {
        return 3;
    }

    if (score >= 200) {
        return 4;
    }

    return 5;
}

export const updateDifficultyLevel = async(req, res) => {
    const { score } = req.body;
    const { id } = req.params;
    // console.log(req.body);
    console.log(score);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No image with that id');

    const image = await Image.findById(id);

    if (image.averageGuessScore === -1) {
        image.averageGuessScore = score;
    } else {
        image.averageGuessScore = (image.averageGuessScore + score) / 2;
    }

    console.log(image.averageGuessScore);

    const newDifficultyLevel = getDifficultyLevelForImage(image.averageGuessScore);
    image.difficultyLevel = newDifficultyLevel;

    const updatedImage = await Image.findByIdAndUpdate(id, image, { new: true });

    res.json({ message: "success", updatedImage });
}
