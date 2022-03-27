import jwt from "jsonwebtoken"

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "30m" })
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({ msg: "Unauthorized" })
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userData) => {
        if (err) return res.status(401).json({ msg: "Unauthorized" })
        req.userid = userData.userid;
        next();
    })
}

export {generateAccessToken, authenticateToken}