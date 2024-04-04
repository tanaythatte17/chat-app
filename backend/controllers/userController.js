import User from "../models/userModel.js";

export const getUsersForSidebars = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({_id : {$ne : loggedInUserId}}).select("-password");
        return res.status(200).json(filteredUser);
    } catch (error) {
        console.log("Error in sidebar",error.message);
        return res.status(500).json({error:"Error in Sidebar"});
    }
};