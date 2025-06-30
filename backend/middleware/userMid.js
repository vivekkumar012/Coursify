import jwt from 'jsonwebtoken'

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No token provided"
        })
    }
    const token = authHeader.split(" ")[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_USER_SECRET);
        req.userId = decode.id;
        next();
    } catch (error) {
        res.status(400).json({
            message: "Invalid token expired",
            error: error.message
        })
    }
}

export default userMiddleware;