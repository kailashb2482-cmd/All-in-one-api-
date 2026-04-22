const User = require('../models/User');
const RewardLog = require('../models/RewardLog');

exports.spinWheel = async (req, res) => {
    const user = req.rewardUser;
    if (user.spinUsedToday >= 3) return res.status(400).json({ message: "Daily limit reached" });

    const rewards = [0, 10, 20, 30, 40, 50, 100];
    const weights = [40, 25, 15, 10, 5, 4, 1]; 
    
    let totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.floor(Math.random() * totalWeight);
    let reward = 0;

    for (let i = 0; i < weights.length; i++) {
        if (random < weights[i]) {
            reward = rewards[i];
            break;
        }
        random -= weights[i];
    }

    user.rewardCoins += reward;
    user.spinUsedToday += 1;
    await user.save();

    await RewardLog.create({ userId: user._id, type: 'spin', reward });

    res.json({ success: true, reward, remainingSpins: 3 - user.spinUsedToday });
};

exports.scratchCard = async (req, res) => {
    const user = req.rewardUser;
    if (user.scratchUsedToday >= 3) return res.status(400).json({ message: "Daily limit reached" });

    const reward = Math.random() < 0.02 ? 100 : Math.floor(Math.random() * 25) + 1;

    user.rewardCoins += reward;
    user.scratchUsedToday += 1;
    await user.save();

    await RewardLog.create({ userId: user._id, type: 'scratch', reward });

    res.json({ success: true, reward, remainingScratch: 3 - user.scratchUsedToday });
};

exports.watchComplete = async (req, res) => {
    const user = req.rewardUser;
    if (user.watchUsedToday >= 5) return res.status(400).json({ message: "Daily limit reached" });

    const reward = Math.floor(Math.random() * 6) + 5; // 5 to 10

    user.rewardCoins += reward;
    user.watchUsedToday += 1;
    await user.save();

    await RewardLog.create({ userId: user._id, type: 'watch', reward });

    res.json({ success: true, reward, remainingWatch: 5 - user.watchUsedToday });
};

exports.exchangeCoins = async (req, res) => {
    const { coinsToConvert } = req.body;
    const user = req.rewardUser;

    if (!coinsToConvert || coinsToConvert < 200 || coinsToConvert % 200 !== 0) {
        return res.status(400).json({ message: "Min 200 coins and multiples of 200 required" });
    }

    if (user.rewardCoins < coinsToConvert) {
        return res.status(400).json({ message: "Insufficient reward coins" });
    }

    const rupeesToAdd = coinsToConvert / 200;
    
    user.rewardCoins -= coinsToConvert;
    user.walletBalance = (user.walletBalance || 0) + rupeesToAdd; // Adjust based on actual field name
    
    await user.save();
    await RewardLog.create({ userId: user._id, type: 'exchange', reward: coinsToConvert, meta: { rupees: rupeesToAdd } });

    res.json({ success: true, coinsUsed: coinsToConvert, rupeesAdded: rupeesToAdd, newBalances: { rewardCoins: user.rewardCoins, walletBalance: user.walletBalance } });
};

exports.getReferralData = async (req, res) => {
    const user = req.rewardUser;
    const shareMessage = `Free Fire tournament App🚨\n\nApp Name - BattleZone X Esports & Tournament app\nFree Joining ✅\nSign up Bonus - ₹10💸\nPer Refer - ₹5 🌟\nFast Join Free\n\nUse Code - ${user.referralCode} Free ₹10 😀\n\nDownload 👇\nhttps://battlezone-x7.onrender.com`;
    res.json({ success: true, referralCode: user.referralCode, shareMessage });
};
