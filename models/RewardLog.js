const mongoose = require('mongoose');

const RewardLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    type: { type: String, enum: ['spin', 'scratch', 'watch', 'exchange'] },
    reward: { type: Number, required: true },
    time: { type: Date, default: Date.now },
    meta: { type: Object }
});

module.exports = mongoose.model('RewardLog', RewardLogSchema);
