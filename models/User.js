const mongoose = require('mongoose');
const crypto = require('crypto');

// Existing schema modification - Add these fields safely
const userSchema = new mongoose.Schema({
    // ... existing fields (username, email, walletBalance, etc.)
    
    rewardCoins: { type: Number, default: 0 },
    spinUsedToday: { type: Number, default: 0 },
    scratchUsedToday: { type: Number, default: 0 },
    watchUsedToday: { type: Number, default: 0 },
    lastRewardResetDate: { type: String, default: "" },
    referralCode: { type: String, unique: true, sparse: true },
    referredBy: { type: String, default: "" },
    rewardClaimHistory: [{
        type: { type: String },
        amount: { type: Number },
        date: { type: Date, default: Date.now }
    }]
});

// Middleware to ensure referral code exists on save
userSchema.pre('save', async function (next) {
    if (!this.referralCode) {
        this.referralCode = 'BZ' + crypto.randomBytes(3).toString('hex').toUpperCase();
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
