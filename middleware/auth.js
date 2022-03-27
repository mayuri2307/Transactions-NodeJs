import jwt from "jsonwebtoken"

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "30m" })
}

export {generateAccessToken}