import User from "../models/user.js"
import bcrypt from 'bcrypt'
import { generateAccessToken } from "../middleware/auth.js"
const registerUser = async (req, res) => {
    const {username, password} = req.body
    const existingUser = await User.findOne({username})
    if(existingUser) return res.status(404).json({message: "User already exist"})
    const hashedPassword = bcrypt.hashSync(password, 12);
    const user = {
        username,
        password: hashedPassword
    }
    const result = new User(user)
    result.save()
            .then(()=>{
                return res.status(200).json({message: "User registered successfully"})
            })
            .catch((err) => console.log(err))
}

const loginUser = async (req, res) => {
    const {username, password} = req.body
    const existingUser = await User.findOne({username})
    if (!existingUser) return res.status(404).json({message: "User does not exist"})
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if (!isPasswordCorrect) return res.status(404).json({message: "Invalid Password"})
    const token = generateAccessToken({
        username: existingUser.username,
        password: existingUser.password,
        userid: existingUser._id
    })
    return res.status(200).json({message:"Login successful", token})
}

export {registerUser, loginUser}