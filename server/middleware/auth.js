import jwt, { decode } from 'jsonwebtoken';

// Middleware for JWT
const auth = async (req, res, next) => {
    try {
        // console.log(req.headers);
        const authorization = req.headers.authorization;

        if (authorization) {
            const token = req.headers.authorization.split(" ")[1];
            let decodedData;
            // console.log(token);

            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else { 
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        next();
    } catch (error) {
        // console.log("Error", error.stack);
        // console.log("Error", error.name);
        // console.log("Error", error.message);
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default auth;