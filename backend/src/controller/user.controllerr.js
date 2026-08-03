import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;
        // my id and my friends id should not be shown here
        const recommendedUsers = await User.find({
            $and: [
                {_id: {$ne: currentUserId}}, // exclude current User 
                {_id: {$nin: currentUser.friends}},  // exclude current user's friends
                {isOnboarded: true}
            ]
        });
        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.log("Error in the getRecommendedUser Controller", error)
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id).select("friends").populate("friends", "fullName pfp bio location learningLanguage nativLanguage"); // select command will select only the friends ID and populate will get the details of friends from the user model
        res.status(200).json({success: true, friends: user.friends});
    } catch (error) {
        console.log("Error in the getMyFriends Controller", error)
        res.status(500).json({message: "Internal server error"});
    }
};
