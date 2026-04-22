const User = require('../models/User');

const dailyRewardReset = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id || req.user._id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const today = new Date().toISOString().split('T')[0];

        if (user.lastRewardResetDate !== today) {
            user.spinUsedToday = 0;
            user.scratchUsedToday = 0;
            user.watchUsedToday = 0;
            user.lastRewardResetDate = today;
            await user.save();
        }
        
        req.rewardUser = user;
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error in reward logic" });
    }
};

module.exports = { dailyRewardReset };
