import jwt from 'jsonwebtoken';
// Middleware for JWT
const auth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (authorization) {
            const token = req.headers.authorization.split(" ")[1];
            let decodedData;

            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else { 
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: auth error." });
    }
}

export default auth;