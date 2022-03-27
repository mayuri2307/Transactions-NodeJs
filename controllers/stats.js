import User from "../models/user.js";
const getStatistics = async(req,res)=>{
  if (!req.userid) return res.json({ message: "No current User logged in" });
    try {
        const currentUser = await User.findById(req.userid);
        const status = {
            net_balance:currentUser.net_balance,
            amount_credited:currentUser.amount_credited,
            amount_debited:currentUser.amount_debited
        }
        res.status(200).send(status)
    } catch (error) {
        res.status(400).json({message:'There was some error'});
    }
}

export {getStatistics}